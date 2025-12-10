# Eureka Frontend - Sistema de Gestión de Usuarios

Frontend desarrollado con Angular 19 para el sistema de gestión de usuarios basado en microservicios.

## 🎨 Características

- **Componentes Standalone** - Arquitectura moderna de Angular 19
- **Registro de Usuarios** - Formulario con validaciones en tiempo real
- **Dashboard de Estadísticas** - Visualización de usuarios por área con gráficos
- **Sistema de Caché** - Optimización de rendimiento con TTL de 30 segundos
- **Diseño Responsivo** - Bootstrap 5.3 con animaciones
- **Testing Completo** - 13 pruebas unitarias con Karma/Jasmine

## 🛠️ Tecnologías

- **Angular 19.0** - Framework web
- **TypeScript 5.9** - Lenguaje tipado
- **Bootstrap 5.3** - Framework CSS
- **Bootstrap Icons 1.13** - Iconografía
- **RxJS 7.8** - Programación reactiva
- **Karma & Jasmine** - Testing framework

## 📦 Requisitos Previos

- Node.js 18+ ([Descargar](https://nodejs.org/))
- npm 9+
- Backend del proyecto corriendo (Eureka Server, API Gateway, User Service)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install
```

## 🎮 Desarrollo

### Iniciar servidor de desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Los cambios se recargarán automáticamente.

## 🏗️ Compilación

### Build de desarrollo

```bash
ng build
```

### Build de producción

```bash
ng build --configuration production
```

Los archivos compilados se guardarán en el directorio `dist/`.

## 🧪 Pruebas

### Ejecutar tests unitarios

```bash
# Single run
npm test -- --watch=false

# Con Chrome Headless (sin abrir navegador)
npm test -- --browsers=ChromeHeadless --watch=false

# Modo watch (desarrollo)
npm test
```

**Resultados esperados:**
- ✅ 13 tests pasando
- `user.spec.ts` - 1 test del servicio HTTP
- `registro.spec.ts` - 6 tests del componente de registro
- `resultados.spec.ts` - 6 tests del componente de estadísticas

## 📁 Estructura del Proyecto

```
eureka-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes de la aplicación
│   │   │   ├── registro/        # Formulario de registro
│   │   │   ├── resultados/      # Dashboard de estadísticas
│   │   │   └── acerca-de/       # Página "Acerca De"
│   │   ├── services/            # Servicios HTTP
│   │   │   └── user.ts          # UserService con caché
│   │   ├── models/              # Modelos TypeScript
│   │   │   └── user.model.ts    # Interfaz User
│   │   └── app.component.ts     # Componente raíz
│   ├── assets/                  # Recursos estáticos
│   ├── styles.css               # Estilos globales
│   └── main.ts                  # Punto de entrada
├── public/                      # Archivos públicos
│   └── images/                  # Imágenes
├── karma.conf.js                # Configuración de Karma
├── tsconfig.json                # Configuración TypeScript
├── angular.json                 # Configuración Angular CLI
└── package.json                 # Dependencias del proyecto
```

## 🌐 Endpoints Consumidos

El frontend consume los siguientes endpoints del backend a través del API Gateway:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `http://localhost:8080/api/users` | Obtener todos los usuarios |
| POST | `http://localhost:8080/api/users` | Crear un nuevo usuario |
| PUT | `http://localhost:8080/api/users/{id}` | Actualizar usuario |
| DELETE | `http://localhost:8080/api/users/{id}` | Eliminar usuario |

## 🎨 Páginas Disponibles

- **Inicio** (`/`) - Registro de nuevos usuarios
- **Resultados** (`/resultados`) - Dashboard con estadísticas por área
- **Acerca De** (`/acerca-de`) - Información del proyecto y tecnologías

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                    # Inicia el servidor de desarrollo

# Testing
npm test                     # Ejecuta tests con Karma

# Build
npm run build               # Compila para producción

# Linting
ng lint                     # Analiza código (si está configurado)
```

## 📝 Características Técnicas

### Sistema de Caché
El `UserService` implementa un sistema de caché inteligente:
- **TTL**: 30 segundos
- **Invalidación automática**: Al crear, actualizar o eliminar usuarios
- **Optimización**: Reduce llamadas innecesarias al backend

### Validaciones del Formulario
- **Nombre**: Requerido, mínimo 2 caracteres
- **Email**: Requerido, formato válido, único
- **Área**: Requerido, selección de lista predefinida

### Áreas Disponibles
- Ventas
- RRHH
- Tecnología
- Marketing
- Finanzas
- Operaciones
- Administración
- Logística

## 🐛 Solución de Problemas

### El frontend no se conecta al backend
- Verificar que los servicios del backend estén corriendo
- Verificar CORS en el API Gateway
- Confirmar que el API Gateway está en el puerto 8080

### Errores de compilación
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Tests fallan
```bash
# Verificar que todas las dependencias de testing estén instaladas
npm install --save-dev @angular/platform-browser-dynamic karma-jasmine-html-reporter zone.js
```

## 📚 Recursos Adicionales

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [RxJS Documentation](https://rxjs.dev/)

## 👨‍💻 Autor

**Yohel Vasquez**

---

Generado con [Angular CLI](https://github.com/angular/angular-cli) versión 21.0.2
