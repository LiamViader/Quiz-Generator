# Análisis del Backend y Auth (Explicación para Humanos)

He analizado a fondo cómo está montado tu proyecto "Quiz Generator" y aquí tienes la verdad completa sobre cómo funciona (y qué le falta).

## PREGUNTAS CLAVE: Autenticación, JWT y Google

### 1. ¿Quién genera el JWT?
**Lo debería generar tu Backend (NestJS).**
El flujo correcto es:
1.  Google te da un "pase" (Google Token).
2.  Tú le das ese pase a tu Backend.
3.  Tu Backend dice "Ok, confío en Google" y te genera **SU PROPIO** pase (JWT de la App).
4.  A partir de ahí, usas el pase del Backend.

**¿Por qué este intercambio?**
-   **Control:** Si quieres banear a un usuario, puedes invalidar tu JWT. No puedes invalidar el token de Google.
-   **Datos Extra:** En tu JWT puedes meter datos de *tu* base de datos (ej: `dailyPersonalUsage`, `role: admin`). En el token de Google solo viene el email y nombre.

### 2. ¿Se usa el de Google?
**En la implementación actual del Frontend: SÍ (y ese es el problema).**
Tu Frontend (`AuthContext.jsx`) coge el token de Google y lo guarda "a pelo" en `localStorage`. **Nunca llama al backend para hacer el cambio.**

### 3. ¿Dónde se guarda?
En el navegador del usuario, usando **LocalStorage**. Es como una cajita fuerte del navegador donde puedes guardar texto.
-   El código hace: `localStorage.setItem('token', tokenDeGoogle)`.

---

## El Problema Actual (¡IMPORTANTE!)

He descubierto una desconexión entre tu Frontend y tu Backend.

### Lo que hace el Backend (`src/auth`)
Tu backend está preparado para ser seguro.
-   Tiene un endpoint `/auth/google-login` esperando recibir el token de Google.
-   Tiene una estrategia `JwtStrategy` esperando recibir un **JWT propio firmado con `JWT_SECRET`**.

### Lo que hace el Frontend (`src/context/AuthContext.jsx`)
Tu frontend **se salta el backend**.
1.  El usuario se loguea con Google.
2.  El frontend guarda el Token de Google.
3.  El frontend muestra "Hola, Usuario" porque descodifica el token de Google.

### ¿Qué pasa cuando generas un Quiz?
1.  El frontend envía una petición a `/generator/generate-quiz`.
2.  **Actualmente NO envía ningún token** (según `FormQuizGen.jsx`, usa `axios.post` sin cabeceras).
3.  El backend recibe la petición sin carnet.
4.  El `OptionalJwtAuthGuard` dice "No hay usuario".
5.  El servicio te trata como **Anónimo**.

**Resultado:** Aunque en la pantalla veas tu nombre, el backend te está aplicando el límite global de usuarios anónimos (probablemente compartido con todos los demás).

---

## Cómo arreglarlo (Próximos Pasos Recomendados)

Para que funcione como un reloj, deberíamos conectar las piezas:

1.  **Frontend:** En `AuthContext.jsx`, cuando Google responde, enviar ese token a `POST http://localhost:3000/auth/google-login`.
2.  **Backend:** Responderá con `{ access_token: "..." }` (el JWT real).
3.  **Frontend:** Guardar ESE token en localStorage.
4.  **Frontend:** Configurar `axios` para que siempre envíe `Authorization: Bearer <TOKEN>` en todas las peticiones.

Si quieres, puedo crear un plan para implementar esto.
