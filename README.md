# Sistema de Gestión de Usuarios - Microservicios con Spring Cloud

Sistema completo de gestión de usuarios desarrollado con arquitectura de microservicios usando Spring Boot, Spring Cloud Netflix Eureka y Angular 19.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Pruebas](#pruebas)
- [Endpoints API](#endpoints-api)
- [Estructura del Proyecto](#estructura-del-proyecto)

## ✨ Características

- 🔄 **Arquitectura de Microservicios** con Spring Cloud
- 🎯 **Service Discovery** con Netflix Eureka
- 🌐 **API Gateway** para enrutamiento centralizado
- 💾 **Base de datos H2** en memoria para desarrollo
- 🎨 **Frontend Angular 19** con Bootstrap 5
- 🐳 **Docker & Docker Compose** para despliegue
- ✅ **Pruebas unitarias** en backend y frontend (16 tests)
- 📊 **Dashboard de estadísticas** por área
- 🔍 **Búsqueda y filtrado** de usuarios
- ⚡ **Sistema de caché** (30s TTL) para mejor rendimiento

## 🛠️ Tecnologías

### Backend
- **Java 17** - Lenguaje de programación
- **Spring Boot 3.2.0** - Framework principal
- **Spring Cloud 2023.0.0** - Microservicios
- **Netflix Eureka** - Service Discovery
- **H2 Database** - Base de datos en memoria
- **Maven** - Gestión de dependencias
- **JUnit 5 & Mockito** - Testing

### Frontend
- **Angular 19** - Framework web
- **TypeScript 5.9** - Lenguaje tipado
- **Bootstrap 5.3** - Framework CSS
- **RxJS 7.8** - Programación reactiva
- **Karma & Jasmine** - Testing

### DevOps
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Angular 19    │
│   Frontend      │ :4200
│   (Standalone)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   API Gateway   │ :8080
│  (Spring Cloud) │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌──────────────┐
│ Eureka │ │ User Service │ :8081
│ Server │ │   (H2 DB)    │
│ :8761  │ └──────────────┘
└────────┘
```

### Componentes

1. **Eureka Server** - Registro y descubrimiento de servicios
2. **API Gateway** - Punto de entrada único, enrutamiento y balanceo
3. **User Service** - Lógica de negocio para gestión de usuarios
4. **Frontend** - Interfaz de usuario con Angular

## 📦 Requisitos Previos

- **Java 17** o superior ([Descargar](https://adoptium.net/))
- **Maven 3.8+** ([Descargar](https://maven.apache.org/download.cgi))
- **Node.js 18+** y npm ([Descargar](https://nodejs.org/))
- **Docker** y Docker Compose ([Descargar](https://www.docker.com/))
- **Git** ([Descargar](https://git-scm.com/))

### Verificar instalación

```bash
java -version
mvn -version
node -version
npm -version
docker -version
docker-compose -version
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/NameYohell/eureka-api-front-prod.git
cd eureka-api-front-prod
```

### 2. Instalar dependencias del Frontend

```bash
cd eureka-frontend
npm install
cd ..
```

## 🎮 Ejecución

### Opción 1: Docker Compose (Recomendado)

```bash
# Levantar todos los servicios del backend
docker-compose up -d

# Ver logs
docker-compose logs -f

# Verificar estado
docker-compose ps
```

Luego ejecutar el frontend:

```bash
cd eureka-frontend
npm start
```

### Opción 2: Ejecución Local

#### Backend

```bash
# Terminal 1 - Eureka Server
cd eureka-server
mvn spring-boot:run

# Terminal 2 - User Service
cd user-service
mvn spring-boot:run

# Terminal 3 - API Gateway
cd api-gateway
mvn spring-boot:run
```

#### Frontend

```bash
# Terminal 4 - Angular
cd eureka-frontend
npm start
```

### Acceso a la aplicación

- **Frontend**: http://localhost:4200
- **Eureka Dashboard**: http://localhost:8761
- **API Gateway**: http://localhost:8080/api/users
- **H2 Console**: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:mem:usersdb`
  - Username: `sa`
  - Password: *(vacío)*

## 🧪 Pruebas

### Backend (Java)

```bash
# Configurar JAVA_HOME (Windows)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"

# Ejecutar todos los tests
cd user-service
mvn test

# Ejecutar una clase específica
mvn test -Dtest=UserServiceTest

# Ejecutar un test específico
mvn test -Dtest=UserServiceTest#testCreateUser_Success
```

**Resultados esperados:**
- ✅ 3 tests: `UserServiceTest` (2) + `UserControllerTest` (1)

### Frontend (Angular)

```bash
cd eureka-frontend

# Ejecutar todos los tests (single run)
npm test -- --watch=false

# Ejecutar con Chrome Headless
npm test -- --browsers=ChromeHeadless --watch=false

# Modo watch (desarrollo)
npm test
```

**Resultados esperados:**
- ✅ 13 tests: `user.spec.ts` (1) + `registro.spec.ts` (6) + `resultados.spec.ts` (6)

### Cobertura Total

✅ **16/16 tests pasando** (3 backend + 13 frontend)
- Bootstrap 5.3.3
- H2 Database
- Docker & Docker Compose

## 📁 Estructura

```
eureka-api-prod/
├── eureka-server/          # Service Discovery
├── api-gateway/                # API Gateway
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
├── user-service/               # Servicio de Usuarios
│   ├── src/
│   │   ├── main/java/com/eureka/userservice/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   └── model/
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
├── eureka-frontend/            # Frontend Angular
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── karma.conf.js
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 📡 Endpoints API

### User Service (vía API Gateway)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/{id}` | Obtener usuario por ID |
| POST | `/api/users` | Crear nuevo usuario |
| PUT | `/api/users/{id}` | Actualizar usuario |
| DELETE | `/api/users/{id}` | Eliminar usuario |

### Ejemplo de Petición

```bash
# Obtener todos los usuarios
curl http://localhost:8080/api/users

# Crear un usuario
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "area": "Tecnología"
  }'
```

### Modelo de Usuario

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "area": "Tecnología"
}
```

## 🔧 Comandos Útiles

### Docker

```bash
# Reconstruir imágenes
docker-compose up -d --build

# Detener servicios
docker-compose down

# Ver logs de un servicio
docker-compose logs -f user-service

# Eliminar volúmenes
docker-compose down -v
```

### Maven

```bash
# Compilar sin tests
mvn clean install -DskipTests

# Ejecutar aplicación
mvn spring-boot:run

# Limpiar proyecto
mvn clean
```

### Angular

```bash
# Desarrollo
npm start

# Build producción
npm run build

# Ejecutar tests
npm test
```

## 📝 Notas Importantes

- **Cache Frontend**: Sistema de caché de 30 segundos para mejor rendimiento
- **Base de datos**: H2 es en memoria, los datos se pierden al reiniciar
- **Perfiles**: Los servicios usan el perfil `docker` en contenedores
- **Health Checks**: Todos los servicios exponen `/actuator/health`
- **Áreas**: Ventas, RRHH, Tecnología, Marketing, Finanzas, Operaciones, Administración, Logística

## 👨‍💻 Autor

**Yohel Vasquez**
- GitHub: [@NameYohell](https://github.com/NameYohell)
- Repositorio: [eureka-api-front-prod](https://github.com/NameYohell/eureka-api-front-prod)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
