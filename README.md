# Tic Tac Toe Premium

A modern, production-ready, and exquisitely polished Tic Tac Toe application built with React and Tailwind CSS.

## Features

- **Beautiful Modern Interface**: Card-based layouts, excellent typography, and crisp spacing.
- **Theme System**: Full light and dark mode support using CSS variables, synced with `localStorage`.
- **Advanced State Management**: Time-travel debugging allows jumping backward and forward in move history.
- **Persistent Scoring**: Player wins and draws are tracked and persist across page reloads.
- **Accessibility (a11y) First**: Fully keyboard navigable, utilizes ARIA live regions for screen readers, and supports high contrast ratios.
- **Responsive Design**: Scales beautifully from mobile devices to ultrawide desktop monitors.
- **Micro-Interactions**: Hover ghosts, scaling active states, and custom animated SVG tokens.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`

## Folder Structure

src/
├── components/
│ ├── game/ # Core game logic components (Board, Square, History, etc.)
│ ├── icons/ # Custom SVG Tokens
│ ├── ui/ # Reusable primitive components (Button, Card)
│ └── ThemeToggle.jsx # Top-level theme switcher
├── hooks/
│ ├── useGameEngine.js # Main state orchestration
│ └── useTheme.js # Light/Dark mode logic
├── utils/
│ ├── cn.js # Tailwind class merging utility
│ └── gameLogic.js # Winner calculation algorithm
├── App.jsx # Main layout wrapper
├── main.jsx # React mounting point
└── index.css # Tailwind base & CSS Variables

## Theme Customisation

The entire application relies on central CSS variables located in `src/index.css`.
To change the branding colours, simply edit the `--primary`, `--x-color`, or `--o-color` HSL values in both the `:root` (light) and `.dark` scopes.

## Future Improvements

- Local multiplayer via WebSockets.
- Configurable grid sizes (e.g., 4x4, 5x5).
- Bot opponent integration using Minimax algorithm.

## License

This project is licensed under the MIT License.
