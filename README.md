# VacunEX - Frontend

Este es el proyecto frontend para la aplicación **VacunEX**, una plataforma de gestión de vacunaciones en el sector ganadero. Utiliza React + Vite + Material UI para una interfaz moderna y responsiva.

## Tecnologías utilizadas

- React 18
- Vite
- Material UI (MUI)
- Axios

## Capturas de pantalla


## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/vacunex-frontend.git
cd vacunex-frontend
```

2. Instala dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Configuración del backend
Asegúrate de que el backend de la aplicación esté corriendo en `http://localhost:8080`.

## Roles y vistas

### Admin
- Vista: `AdminDashboardContent.jsx`
- Funciones:
  - Ver número total de vacunaciones
  - Ver gráfica de vacunaciones por mes
  - Ver tabla de vacunaciones
  - Ver y registrar vacunadores

### Vacunador
- Vista: `VaccinatorDashboard.jsx`
- Funciones:
  - Registrar vacunaciones (formulario)
  - Visualizar sus propias vacunaciones (tabla)

## Script de generación masiva
En `src/utils/setup.js` puedes generar 10 vacunadores con 10 vacunaciones cada uno. Ejecuta:

```bash
node src/utils/setup.js
```

Se te pedirá el token de un administrador para autorizar las operaciones.

## Autenticación
El sistema utiliza JWT almacenado en `localStorage`. El hook `useAuth` maneja la autenticación global.

## Temas y estilo
El tema por defecto ha sido modificado para usar colores **verdes corporativos** (`#5D9C00`).

## Licencia
Este proyecto está bajo la licencia MIT.
