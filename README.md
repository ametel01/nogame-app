# NoGame App

## Overview

NoGame App is a comprehensive gaming platform that integrates a front-end user interface with a robust backend server, providing an immersive gaming experience. This repository contains all the necessary components for running and managing both the frontend and backend aspects of the NoGame application.

## Repository Structure

- `packages/`
  - `backend/`: Contains the backend server of NoGame App, written in TypeScript. It includes:
    - `src/`: Source files for the backend server.
      - `app.ts`: Entry point of the backend application.
      - `config/`: Configuration files, including the database client.
      - `controllers/`: Controllers for handling various backend functionalities like battle reports and leaderboards.
      - `routes/`: Route definitions for the backend API.
      - `services/`: Service files for processing business logic.
    - `nodemon.json`, `package.json`, `tsconfig.json`: Configuration files for Node.js, NPM dependencies, and TypeScript.
  - `frontend/`: Contains the front-end application built with React.
    - `src/`: Source files for the frontend application, including components, hooks, and views.
      - `App.tsx`: Main React component.
      - `assets/`: Static assets like images and icons.
      - `components/`: Reusable React components.
      - `hooks/`: Custom React hooks for state and logic management.
      - `pages/`: React components representing different pages.
      - `styles/`: Style files for the frontend.
    - `index.html`, `package.json`, `vite.config.ts`: Main HTML file, NPM dependencies, and Vite configuration for the frontend.

- `package.json`, `package-lock.json`: Root NPM configuration and lock files for managing dependencies across the monorepo.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
