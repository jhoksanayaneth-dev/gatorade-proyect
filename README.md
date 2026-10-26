# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# reglas para gestionar nuestro proyecto con git y githum

nunac tomes cambion con main, main es la version sagrada principal y la que esta en produccion 

# El siclo de vida profeciconal (the workflow)

cacda vex que vayas a hacer algo (arreglar un boton un bug, cambiar un color) sigue estos pasos

1. paso Sincronizar (Start Fresh)
antes de empesar, asegurate de estar en main y tener todo lo ultimo
2. crear una rama (branching)
crear una copia temporal del codigo par trabajar seguro si rompes algo no pasa nada 

nomenclatura profecional
git checkout -b feature/nombre-nueva-funcionalidad(para cosas nuevas) crea una nueva rama y se mueve a esa rama 
fix/nombre-del-error(para arreglar bug o fallos o para arreglar algo)
rafactor/nombre-del-cambio(limpieza de codigo) 
