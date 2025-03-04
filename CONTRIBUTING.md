# Contributing to CIT Class Routine Manager

## Development Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

## Project Structure

```
app/
├── components/     # Reusable UI components
├── constants/      # Application constants
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Coding Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for functions

## Component Guidelines

- Use functional components with hooks
- Follow atomic design principles
- Keep components small and focused
- Use Tailwind CSS for styling

## Performance Considerations

- Use Next.js Image component for images
- Implement code splitting where needed
- Minimize bundle size
- Use proper caching strategies

## Testing

- Write unit tests for utilities
- Test components in isolation
- Ensure accessibility standards

## Git Workflow

1. Create feature branch
2. Make changes
3. Run linter: `npm run lint`
4. Submit pull request

## Build and Deploy

```bash
# Production build
npm run build

# Start production server
npm start