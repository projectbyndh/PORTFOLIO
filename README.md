# Nepal Digital Height and Technology
<!-- markdownlint-disable MD046 -->

Welcome to the Nepal Digital Height and Technology project! This is a portfolio website showcasing innovative digital solutions and technologies, highlighting the work and achievements in the tech industry in Nepal.
Project Overview

The Nepal Digital Height and Technology project aims to create a comprehensive portfolio website that demonstrates the expertise in digital technologies, software development, and IT solutions in Nepal. The project will serve as a platform for showcasing skills, past work, and offering services in a professional and attractive manner.
Features






Technologies Used

    React: A JavaScript library for building user interfaces.

    Tailwind CSS: A utility-first CSS framework for creating custom designs.

    Vite: A fast build tool for modern web development.

    ESLint: For code linting and ensuring code quality.



This project is licensed under the MIT License - see the LICENSE file for details.
 
## Local development

```bash
pnpm install   # or: npm install
pnpm dev       # or: npm run dev
```

## Build & preview

```bash
pnpm run build
pnpm preview
```

## Routing and hosting

This is a Single Page Application (SPA). Static hosts need a fallback so client-side routes work on refresh and deep-links.

- We added a root-level 404.html (copy of index) and public/.htaccess with SPA rewrite rules for Apache/Hostinger so unknown paths route to index.html.
- If your host does not support rewrites, switch `BrowserRouter` to `HashRouter` in `src/App.jsx` to use URLs like `/#/route` with no server config.
- Routes normalized: lowercase variants and redirects added (e.g., `/Careers` → `/careers`, `/E-Services` → `/e-services`). A catch‑all route sends unknown paths to home.

