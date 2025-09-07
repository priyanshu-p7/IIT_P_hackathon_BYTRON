# TODO: Convert TypeScript/React TSX to JavaScript/React

## Information Gathered
- **TSX Files to Convert**: src/App.tsx, src/main.tsx, src/components/Header.tsx, src/components/Sidebar.tsx (and other components)
- **TS Files to Convert**: vite.config.ts, src/vite-env.d.ts
- **TypeScript Config Files**: tsconfig.json, tsconfig.app.json, tsconfig.node.json
- **Package Dependencies**: Contains TypeScript-related deps (@types/react, @types/react-dom, typescript, typescript-eslint)
- **Project Structure**: Vite-based React app with Tailwind CSS

## Plan
- [x] Convert TSX files to JSX:
  - Remove TypeScript type annotations
  - Change file extensions from .tsx to .jsx
  - Update import statements to reference new .jsx files
- [x] Convert TS files to JS:
  - Remove TypeScript syntax
  - Change file extensions from .ts to .js
- [x] Update package.json:
  - Remove TypeScript dependencies (@types/*, typescript, typescript-eslint)
  - Keep React and other JS dependencies
- [x] Remove TypeScript config files:
  - Delete tsconfig.json, tsconfig.app.json, tsconfig.node.json
  - Delete src/vite-env.d.ts
- [x] Update Vite config:
  - Convert vite.config.ts to vite.config.js
- [x] Test the converted project:
  - Run npm install
  - Run npm run dev
  - Check for any build or runtime errors

## Dependent Files to be Edited
- src/main.tsx → src/main.jsx
- src/App.tsx → src/App.jsx
- src/components/Header.tsx → src/components/Header.jsx
- src/components/Sidebar.tsx → src/components/Sidebar.jsx
- src/components/ChatPanel.tsx → src/components/ChatPanel.jsx
- src/components/Footer.tsx → src/components/Footer.jsx
- src/components/MapPanel.tsx → src/components/MapPanel.jsx
- vite.config.ts → vite.config.js
- package.json
- Remove: tsconfig.json, tsconfig.app.json, tsconfig.node.json, src/vite-env.d.ts

## Followup Steps
- Install dependencies after package.json update
- Run the development server to verify functionality
- Check console for any errors
- Test all components and features
