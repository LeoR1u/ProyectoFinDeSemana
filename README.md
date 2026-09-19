# Módulo Actas Nacionales

Proyecto web con **Laravel** (API) en el backend, **React** (Vite) en el frontend y **PostgreSQL** como base de datos. Todo el entorno de desarrollo corre en contenedores con **Docker Compose**, así que no necesitas instalar PHP, Node ni Postgres en tu máquina.

> Descripción del proyecto: _escribe aquí en una o dos líneas qué hace la aplicación._

## Tecnologías

| Capa | Tecnología |
|---|---|
| Backend | Laravel (PHP 8.4) |
| Frontend | React + Vite |
| Base de datos | PostgreSQL 17 |
| Entorno | Docker y Docker Compose |

## Servicios y puertos

| Servicio | Descripción | URL / Puerto |
|---|---|---|
| `backend` | API de Laravel | http://localhost:8000 |
| `frontend` | Servidor de desarrollo de React | http://localhost:5173 |
| `db` | PostgreSQL | `localhost:5432` |

## Estructura del proyecto

```
.
├── docker-compose.yml
├── backend/          # Laravel
│   ├── Dockerfile
│   └── .env.example
└── frontend/         # React + Vite
    └── Dockerfile
```

## Requisitos previos

- [Docker](https://docs.docker.com/engine/install/) y el plugin **Docker Compose** (`docker compose version` debe funcionar).
- [Git](https://git-scm.com/).
- Un cliente para Postgres es opcional (por ejemplo DBeaver o pgAdmin).

> **Fedora / SELinux:** los volúmenes del `docker-compose.yml` usan la opción `:z`. No la quites, o los contenedores no podrán escribir en las carpetas del proyecto.

## Instalación

```bash
# 1. Clonar el repositorio
git clone git@github.com:LeoR1u/ProyectoFinDeSemana.git
cd ProyectoFinDeSemana

# 2. Crear el archivo de entorno del backend
cp backend/.env.example backend/.env

# 3. Construir las imágenes
docker compose build

# 4. Instalar dependencias (dentro de contenedores, no en tu máquina)
docker compose run --rm backend composer install
docker compose run --rm frontend npm install

# 5. Generar la clave de la aplicación Laravel
docker compose run --rm backend php artisan key:generate

# 6. Levantar los servicios
docker compose up -d

# 7. Crear las tablas y cargar datos de ejemplo
docker compose exec backend php artisan migrate --seed
```

Después abre:

- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## Configuración de la base de datos

El `backend/.env` debe tener estos valores (ya vienen en `.env.example`):

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=secret
```

`DB_HOST` es `db` (el nombre del servicio en Docker Compose), **no** `localhost`.

Para conectarte desde un cliente externo (DBeaver, pgAdmin) usa `localhost:5432` con las mismas credenciales.

Para entrar a Postgres desde la terminal:

```bash
docker compose exec db psql -U app -d app
```

## Comandos útiles

### Docker Compose

```bash
docker compose up -d              # levantar todo en segundo plano
docker compose stop               # detener sin borrar nada
docker compose down               # detener y eliminar contenedores y red (los datos se conservan)
docker compose down -v            # ATENCIÓN: también borra el volumen y pierdes la base de datos
docker compose ps                 # ver el estado de los servicios
docker compose logs -f backend    # ver logs en vivo de un servicio
docker compose build              # reconstruir imágenes tras cambiar un Dockerfile
```

### Laravel (backend)

```bash
docker compose exec backend php artisan migrate
docker compose exec backend php artisan migrate:fresh --seed   # reinicia la base de datos
docker compose exec backend php artisan make:model Producto -m
docker compose exec backend php artisan make:controller ProductoController
docker compose exec backend composer require <paquete>
```

### React (frontend)

```bash
docker compose exec frontend npm install <paquete>
docker compose exec frontend npm run build
```

> **Importante:** instala siempre las dependencias con `docker compose exec` o `docker compose run --rm`, nunca con `npm install` o `composer install` directamente en tu máquina. Así evitas binarios incompatibles entre tu sistema y el contenedor.

### Alias opcionales (`~/.bashrc`)

```bash
alias art='docker compose exec backend php artisan'
alias composer-d='docker compose exec backend composer'
alias npm-d='docker compose exec frontend npm'
```

## Flujo de trabajo con Git

- Trabaja en ramas y abre Pull Requests hacia `main` en lugar de subir directamente.
- No subas `.env`, `vendor/` ni `node_modules/` (ya están en el `.gitignore`).
- Los cambios en la base de datos se comparten con **migraciones** (`backend/database/migrations/`) y **seeders** (`backend/database/seeders/`), nunca con volcados de datos.
- Si dos personas crean migraciones a la vez, coordínense: el orden de las migraciones importa.
- Después de un `git pull`, si hay migraciones nuevas, ejecuta `docker compose exec backend php artisan migrate`.

## Solución de problemas

**El contenedor `backend` se detiene al iniciar.** Revisa el motivo con `docker compose logs backend`. Las causas más comunes son que falte `vendor/` (ejecuta `composer install`), que falte `backend/.env` o que la versión de PHP del Dockerfile sea menor a la que piden las dependencias.

**`Permission denied` al escribir archivos.** Verifica que tu usuario tenga UID 1000 (`id -u`), que es el que usa el `docker-compose.yml`. Si es distinto, ajusta el valor de `user:` en el compose. También confirma que los volúmenes tengan la opción `:z` en Fedora.

**`connection refused` al conectar con la base de datos.** Comprueba que `DB_HOST=db` en `backend/.env` y que el servicio `db` esté en estado `Up` (`docker compose ps`).

**El puerto 5432, 8000 o 5173 ya está en uso.** Detén el programa que lo ocupa o cambia el puerto de la izquierda en el `docker-compose.yml` (por ejemplo `"5433:5432"`).

**El frontend no carga desde el navegador.** Vite debe iniciarse con `--host` (ya configurado en el compose) para ser accesible desde fuera del contenedor.

## Notas

- `php artisan serve` es solo para desarrollo. Para producción se recomienda Nginx con PHP-FPM y el frontend compilado con `npm run build`.
- Al ser el frontend (puerto 5173) y el backend (puerto 8000) orígenes distintos, Laravel debe permitir las peticiones del front mediante CORS (`backend/config/cors.php`).
