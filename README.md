# Air Quality Monitoring Dashboard

**Author**: Ahmad Irfan  
**Project**: Air Quality Dashboard  

## Description

A comprehensive air quality monitoring dashboard built with React, TypeScript, and modern web technologies. This application provides real-time visualization and analysis of air quality parameters with an intuitive glass-morphism UI design.

## Features

- **Real-time Data Visualization**: Interactive charts and graphs for air quality parameters
- **Time Series Analysis**: Track air quality trends over time
- **Parameter Comparison**: Compare multiple air quality metrics
- **Responsive Design**: Glass-morphism UI that works on all devices
- **Data Export**: Export air quality data in various formats
- **Statistics Dashboard**: Comprehensive statistics and metrics

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts, D3.js
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI, Shadcn/ui
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd airview-glass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components
│   ├── common/         # Common UI components
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── stores/             # State management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## API Integration

The dashboard integrates with air quality data APIs to fetch:
- Time series data for various parameters
- Statistical summaries
- Historical data ranges
- Real-time updates

## Deployment

### Build the project:
```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.

---

**Created by Ahmad Irfan** - Air Quality Monitoring Dashboard