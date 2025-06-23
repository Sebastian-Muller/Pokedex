# Pokédex App

Esta es una aplicación básica de Pokédex construida con React que utiliza la PokeAPI para obtener información sobre Pokémon.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

```
pokedex-app
├── public
│   ├── index.html        # Plantilla HTML principal
│   └── favicon.ico       # Ícono de la aplicación
├── src
│   ├── components
│   │   ├── PokemonCard.jsx  # Componente para mostrar un Pokémon
│   │   └── PokemonList.jsx  # Componente para listar Pokémon
│   ├── pages
│   │   └── Home.jsx         # Página principal de la aplicación
│   ├── services
│   │   └── api.js           # Funciones para interactuar con la PokeAPI
│   ├── App.jsx              # Componente raíz de la aplicación
│   ├── index.jsx            # Punto de entrada de la aplicación
│   └── styles
│       └── App.css          # Estilos CSS para la aplicación
├── package.json              # Configuración de npm y dependencias
├── .gitignore                # Archivos y carpetas a ignorar por Git
└── README.md                 # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd pokedex-app
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Funcionalidades

- Visualización de una lista de Pokémon.
- Detalles de cada Pokémon al hacer clic en su tarjeta.
- Interacción con la PokeAPI para obtener datos actualizados.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.