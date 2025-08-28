📖 README – Angular Reddit Clone
Este proyecto es un Reddit Clone hecho con Angular (frontend) y Spring Boot (backend).
Incluye funcionalidades de autenticación, creación de subreddits, posts, votos y comentarios.
En el frontend usamos TinyMCE como editor de texto enriquecido para crear publicaciones.

🚀 Requisitos previos
Node.js v12+
Angular CLI (npm install -g @angular/cli)
Java 11+
Maven (para el backend)
⚙️ Configuración inicial
Clonar el repositorio

bash
git clone https://github.com/TU-USUARIO/angular-reddit-clone.git
cd angular-reddit-clone
Instalar dependencias

bash
npm install
📝 Configuración de TinyMCE
Este proyecto utiliza TinyMCE Cloud como editor.
Es necesario tener un API Key gratuito de tiny.cloud.

Crea una cuenta en 👉 Tiny Cloud.

Obtendrás una clave con este formato:

text
abcd1234efgh5678ijklmnopqrstuvwx
Abre el archivo src/environments/environment.ts y src/environments/environment.prod.ts.

Reemplaza TU_API_KEY_AQUI con tu clave:

ts
export const environment = {
  production: false,
  tinyApiKey: 'TU_API_KEY_AQUI'
};
ts
export const environment = {
  production: true,
  tinyApiKey: 'TU_API_KEY_AQUI'
};
¡Listo! TinyMCE funcionará en modo edición y podrás crear posts sin problemas.

▶️ Ejecutar la app
Corre el backend (Spring Boot):

bash
mvn spring-boot:run
Por defecto se inicializa en http://localhost:8080.

Corre el frontend (Angular):

bash
ng serve
Estará disponible en http://localhost:4200.

⚡ Notas importantes
El error “A valid API key is required to continue using TinyMCE” aparece si no configuras tu tinyApiKey.
Puedes usar la versión gratuita, que soporta hasta 5 dominios y 50k requests/mes.
Si vas a compartir este repo públicamente, no subas tu clave real a GitHub.
Cada usuario puede configurar su propia tinyApiKey en environment.ts.
👨‍💻 Contribuciones
¡Los PRs son bienvenidos!
Si tienes sugerencias para mejorar la app (UI, features, rendimiento), no dudes en abrir un issue o pull request.

