# Burogu

Burogu is a modern blogging platform built with React, TypeScript, and Vite for the frontend, and a Node.js backend.

## Features
- Create and manage blog posts
- User authentication
- Responsive design
- Night mode toggle
- Editing posts
- email verification (pending)

## Installation

### Backend

To install and run the backend server:

```bash
cd backend
npm install
npm run dev
```

To deploy the backend, use:

```bash
npm run deploy
```

### Frontend

To install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Configuration

### Wrangler Configuration

Update the `wrangler.toml` file with your environment variables:

```toml
name = "backend"
main = "src/index.ts"
compatibility_date = "2025-01-04"

[vars]
DATABASE_URL=""
JWT_SECRET=""
```

### Common Module
Common folder includes zod types which are accessed by both frontend and backend,
published common file package available at https://www.npmjs.com/package/@piyush_007/medium_cl

### Expanding the ESLint configuration

For production applications, update the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.

Optionally, add `...tseslint.configs.stylisticTypeChecked`.

Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
