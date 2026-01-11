# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React-based frontend application for what appears to be a fitness/gym-related website. Built with Create React App and styled with TailwindCSS.

## Development Commands
- `npm start` - Run development server (opens http://localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests in interactive watch mode
- `npm run eject` - Eject from Create React App (one-way operation)

## Architecture & Structure

### Tech Stack
- React 19.1.1 with React Router DOM for routing
- TailwindCSS for styling with custom theme configuration
- Axios for HTTP requests
- React Icons for icon components
- Testing Library for unit tests

### Directory Structure
- `src/components/` - Reusable UI components (currently contains nav.js for navigation)
- `src/pages/` - Page-level components organized by feature:
  - `auth/` - Login and registration pages
  - `Home/` - Home page components (main page, about, stats sections)
- `src/contexts/` - React Context providers (currently empty)
- `src/services/` - API services and external integrations (currently empty)
- `src/assets/images/` - Static image assets
- `src/utils/` - Utility functions (currently empty)

### Routing
The app uses React Router with three main routes:
- `/` - Home page (landing page with hero, about, and stats sections)
- `/login` - User authentication
- `/register` - User registration

### Styling
- Uses TailwindCSS with custom configuration in `tailwind.config.js`
- Custom colors: `customOrange1` (#FF5800), `customOrange2` (#FFB800), `homepageColor` (#11131B)
- Custom breakpoint: `sm` starts at 1024px instead of default
- Global styles in `index.css` and auth-specific styles in `pages/auth/auth.css`

### Component Architecture
- Navigation component (`nav.js`) handles responsive design with different logos for mobile/desktop
- Home page is composed of multiple sections: HeroSection, Bio (about), and StatsSection
- Uses functional components with React hooks (useState for state management)

### Development Notes
- Project follows Create React App structure and conventions
- Uses modern React patterns (functional components, hooks)
- Responsive design implemented with TailwindCSS utilities
- Image assets stored in `src/assets/images/`