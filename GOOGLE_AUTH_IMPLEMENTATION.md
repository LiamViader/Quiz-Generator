# Implementación de Google Login y Rate Limiting Híbrido

## Objetivos
1.  **Autenticación**: Permitir a los usuarios loguearse con Google.
2.  **UI Personalizada**: Mostrar avatar de Google en la Navbar o icono de "Login" si es anónimo.
3.  **Sistema de Cuotas Híbrido**:
    *   **Anónimos**: Consumen únicamente del **Límite Global** (100 usos/día).
    *   **Usuarios Registrados**: Tienen **10 usos garantizados/día** (Cuota Personal). Si los agotan, pueden seguir consumiendo del **Límite Global** restante.

---

## 1. Frontend (React)

### Dependencias
*   `npm install @react-oauth/google jwt-decode`

### Configuración
*   Configurar `GoogleOAuthProvider` en `main.jsx`.
*   Crear contexto `AuthContext` para almacenar `user` (datos del token) y `token` (JWT).

### Componentes UI
#### `ResponsiveAppBar.jsx`
Modificar la lógica del placeholder de usuario:

*   **Estado: Logueado (`user != null`)**
    *   Mostrar `<Avatar src={user.picture} />`.
    *   (Opcional) Menú desplegable al hacer clic (Cerrar Sesión).
*   **Estado: No Logueado**
    *   Mostrar icono genérico (ej. `AccountCircleIcon` en gris).
    *   **Acción**: Al hacer clic, navegar a la ruta `/login`.

#### `LoginPage.jsx` (Nueva Página)
*   Ruta: `/login`.
*   Diseño centrado con el botón oficial:
    ```jsx
    <GoogleLogin
      onSuccess={credentialResponse => {
        // Enviar credentialResponse.credential al backend para verificar
        // Guardar token y redirigir a Home
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
    ```

---

## 2. Backend (NestJS)

### Base de Datos (MongoDB)
Nueva colección `users`.

**Schema `User`**:
```typescript
{
  email: String, (index, unique)
  googleId: String,
  name: String,
  picture: String,
  
  // Rate Limiting Personal
  dailyPersonalUsage: { type: Number, default: 0 },
  lastUsageDate: { type: String, default: "YYYY-MM-DD" } 
}
```

### Autenticación
*   Endpoint `POST /auth/google-login`: Recibe el token de Google del frontend.
*   **Validación**: Usa `google-auth-library` para verificar el token.
*   **Lógica**: 
    *   Si el email no existe -> Crear usuario.
    *   Si existe -> Actualizar datos (foto, nombre).
    *   Generar JWT de sesión propio de la app (para no depender de la caducidad del token de Google en cada llamada).

### Middleware / Guard
*   `OptionalAuthGuard`: Verifica la cabecera `Authorization: Bearer <JWT>`.
    *   Si es válido -> inyecta `req.user`.
    *   Si no -> `req.user` es undefined.

---

## 3. Lógica de Rate Limiting (GeneratorService)

El núcleo de la lógica Híbrida a implementar en `checkAndIncrementDailyUsage(user?)`:

1.  **Obtener Fecha Hoy**: "YYYY-MM-DD".
2.  **Si hay Usuario (`user`)**:
    *   Verificar si `user.lastUsageDate != Hoy`. Si es distinto, resetear `user.dailyPersonalUsage = 0`.
    *   **Comprobar Cuota Personal**:
        *   Si `user.dailyPersonalUsage < 10`:
            *   Incrementar `user.dailyPersonalUsage`.
            *   Guardar y **PERMITIR**. (No toca el límite global).
            *   *Fin del flujo*.
        *   Si `user.dailyPersonalUsage >= 10`:
            *   El usuario ha gastado su bono. Pasar al flujo de **Límite Global**. (Paso 3).

3.  **Verificar Límite Global (Para Anónimos y Usuarios sin bono)**:
    *   Obtener documento `DailyUsage` de hoy.
    *   Si `DailyUsage.count < 100`:
        *   Incrementar `DailyUsage.count`.
        *   **PERMITIR**.
    *   Si `DailyUsage.count >= 100`:
        *   **BLOQUEAR**. (Lanzar Excepción 429).
        *   Mensaje: "Límite global alcanzado. Intenta mañana."

---

## 4. Resumen de Flujo de Datos

1.  Usuario abre la App -> Ve icono gris.
2.  Click -> Login Page -> Login con Google.
3.  App guarda JWT -> Redirige a Home -> Ve su Avatar.
4.  Usuario genera Quiz:
    *   Backend detecta usuario.
    *   Tiene 0 usos hoy -> Usa 1 personal (Global intacto).
    *   ... Genera 10 quizzes ...
    *   Intenta el 11º -> Backend ve cuota personal agotada.
    *   Backend mira Global (Llevan 50 de 100). -> Usa 1 Global.
    *   Usuario feliz (ha podido hacer 11).
