# Guía de Migración: Quiz Generator (Azure -> Stack Gratuito)

Esta guía detalla los pasos para migrar tu aplicación de Azure a una arquitectura de bajo coste/gratuita, integrándola en tu dominio (`liamviader.com`) gestionado por Cloudflare y Vercel.

## Stack Propuesto (Gratuito/Low-Cost)

| Componente | Antes (Azure) | Nuevo (Propuesto) | Coste Aprox. |
| --- | --- | --- | --- |
| **Frontend** | Azure Static Web Apps | **Vercel** (Free Tier) | $0 |
| **Backend** | Azure App Service | **Render** (Free Web Service)* | $0 |
| **Database** | Azure CosmosDB | **MongoDB Atlas** (Free M0) | $0 |
| **DNS** | Azure DNS | **Cloudflare** (Ya lo tienes) | $0 |

*\*Nota: El plan gratuito de Render se "duerme" tras 15 mins de inactividad, tardando unos segundos en "despertar" en la primera petición.*

---

## 1. ¿Qué es ese `Dockerfile` y por qué lo necesito?

No te preocupes, no necesitas ser experto en Docker. Piensa en el `Dockerfile` como una **receta de cocina** que le dice a Render cómo "cocinar" tu backend.

*   **Sin Docker**: Tendrías que configurar manualmente el servidor (Node.js versions, dependencias, comandos de inicio) en Render, lo cual a veces falla o cambia entre proveedores.
*   **Con Docker**: Le das la receta exacta. Render solo sigue las instrucciones: "Usa Node 18, copia estos archivos, instala esto y arranca así".

**Solo tienes que crear este archivo y olvidarte.** (Instrucciones en el Paso 3).

---

## 2. Estrategia de Dominio (liamviader.com)

Tienes tu portfolio en `liamviader.com` (Vercel + Cloudflare). Quieres el Quiz en ese mismo dominio. Tienes dos opciones gratuitas:

### Opción A: Subdominio (Más fácil y segura) -> `quiz.liamviader.com`
Es la más sencilla de configurar con Cloudflare.
1.  Despliegas el frontend del Quiz en un proyecto nuevo de Vercel.
2.  En Vercel (Quiz) vas a **Settings > Domains** y añades `quiz.liamviader.com`.
3.  Vercel te dará unos valores DNS.
4.  Vas a **Cloudflare** y creas un registro `CNAME`:
    *   Name: `quiz`
    *   Target: `cname.vercel-dns.com` (o lo que te diga Vercel).
    *   Proxy status: Puedes dejarlo en "Proxied" (nube naranja).

### Opción B: Sub-ruta (Integrado) -> `liamviader.com/quiz`
Esta opción hace que parezca parte de tu web principal, pero requiere **tocar el código de tu Portfolio**.
Esto usa una característica de Vercel llamada "Rewrites".

1.  Despliegas el frontend del Quiz en Vercel (digamos que se llama `quiz-project.vercel.app`).
2.  Vas al repositorio de tu **PORTFOLIO** (no el del quiz).
3.  Editas (o creas) el archivo `vercel.json` en la raíz del Portfolio:

```json
{
  "rewrites": [
    {
      "source": "/quiz/:match*",
      "destination": "https://quiz-project.vercel.app/:match*"
    }
  ]
}
```
4.  Debes configurar tu Quiz para saber que vive en `/quiz/`:
    *   En `frontend/vite.config.js` del Quiz, asegúrate de poner `base: '/quiz/'`.

**Recomendación**: Usa la **Opción A (Subdominio)** primero. Es menos propensa a romper tu portfolio actual. Si luego quieres cambiar, siempre puedes hacerlo.

---

## 3. Base de Datos (MongoDB Atlas)

Necesitas un nuevo cluster de MongoDB ya que perderás el de Azure.

1.  Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Crea un nuevo proyecto y un **Cluster (Shared/Free Tier M0)**.
3.  En "Security":
    *   **Database Access**: Crea un usuario y contraseña.
    *   **Network Access**: Añade `0.0.0.0/0` (Permitir acceso desde cualquier lugar, necesario para Render).
4.  Obtén la conexión: Click "Connect" -> "Drivers" -> Copia la string.
    *   Ejemplo: `mongodb+srv://usuario:password@cluster0.abcde.mongodb.net/nombre_db`

---

## 4. Migración del Backend (Render)

### 4.1 Crear el Dockerfile
Crea un archivo llamado `Dockerfile` (sin extensión) en la carpeta `backend/` con este contenido exacto:

```dockerfile
# backend/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la app
RUN npm run build

# Configurar puerto
ENV PORT=3000
EXPOSE 3000

# Comando para arrancar
CMD ["npm", "run", "start:prod"]
```

### 4.2 Ajustar el puerto en código
Abre `backend/src/main.ts` y asegúrate de que use `process.env.PORT`. Si está fijo en 3000, cámbialo:

```typescript
// backend/src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS para que tu frontend pueda hablarle
  app.enableCors(); 
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

### 4.3 Desplegar en Render
1.  Sube tus cambios a GitHub.
2.  En [Render](https://render.com), crea un **Web Service**.
3.  Conecta tu repo.
4.  Configuración:
    *   Root Directory: `backend`
    *   Runtime: **Docker**
    *   Variables de Entorno:
        *   `DB_URI`: Tu conexión de MongoDB Atlas.
        *   `OPENAI_API_KEY`: Tu key de OpenAI.
        *   `PORT`: `3000` (opcional, Render suele ponerlo solo).

---

## 5. Migración del Frontend (Vercel)

### 5.1 Configurar URL del Backend
Tu frontend necesita saber dónde está el nuevo backend de Render.
En `frontend/.env` (local) y en las Environment Variables de Vercel:

`VITE_API_URL=https://nombre-de-tu-backend-en-render.onrender.com`

### 5.2 Desplegar
sigue los pasos estándar de Vercel (Importar repo -> Framework Vite -> Deploy).

---

## Resumen de pasos inmediatos:
1.  **MongoDB**: Crear cuenta Atlas y obtener connection string.
2.  **Código**: 
    *   Crear `backend/Dockerfile`.
    *   Revisar `backend/src/main.ts` (puerto y CORS).
3.  **Deploy Backend**: Subir a Render y poner las variables de entorno.
4.  **Deploy Frontend**: Subir a Vercel apuntando al backend de Render.
5.  **Dominio**: Configurar `quiz.liamviader.com` en Vercel y Cloudflare.
