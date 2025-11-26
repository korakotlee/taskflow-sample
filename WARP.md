# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is the TaskFlow project management application repository from "The Full Stack" book. It's a multi-component full-stack application with React/TypeScript frontend, Ruby on Rails backend, and infrastructure configurations.

## Chapter-Based Development

This repository uses Git tags for chapter-specific code versions. To work with a specific chapter:

```bash
git checkout chapter-XX  # Where XX is the chapter number (01-15)
```

Always check which chapter tag you're on before making changes, as the codebase structure may differ between chapters.

## Technology Stack

- **Frontend**: React + TypeScript (Node.js 20+)
- **Backend**: Ruby on Rails (Ruby 3.2+)
- **Database**: PostgreSQL 16
- **Containerization**: Docker Desktop
- **Infrastructure**: Terraform, Kubernetes
- **Cloud**: AWS (for deployment chapters)

## Development Commands

### Frontend (React + TypeScript)
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm test             # Run tests
npm run lint         # Run linting
```

### Backend (Ruby on Rails)
```bash
cd backend
bundle install       # Install dependencies
rails db:setup       # Setup database
rails server         # Start development server
rails test           # Run tests
rails db:migrate     # Run migrations
rails db:rollback    # Rollback last migration
```

### Docker (Full Stack)
```bash
docker-compose up                    # Start all services
docker-compose up -d                 # Start in detached mode
docker-compose down                  # Stop all services
docker-compose logs -f [service]     # View logs
docker-compose exec [service] bash   # Shell into service
```

## Architecture Notes

### Multi-Component Structure

The codebase is organized into distinct layers:

- **frontend/**: React SPA with TypeScript for type safety
- **backend/**: Rails API-only application
- **infrastructure/**: IaC with Terraform and Kubernetes manifests
- **docs/**: Additional documentation beyond the book

### API Integration

The frontend communicates with the backend via REST API. API endpoints are documented in the backend codebase. When working across the stack, ensure API contracts are maintained between frontend and backend changes.

### Database Considerations

PostgreSQL is the primary database. When making schema changes:
1. Create migrations in the backend
2. Update corresponding TypeScript types in the frontend
3. Test the full stack integration

### Containerization Strategy

The project uses Docker for both development and production. Each component has its own Dockerfile. The docker-compose configuration orchestrates all services for local development.

## Testing Strategy

- Frontend tests use Jest and React Testing Library
- Backend tests use Rails' built-in testing framework
- Integration tests span both frontend and backend
- Infrastructure changes should be validated with `terraform plan` before applying

## Deployment

Later chapters introduce CI/CD with GitHub Actions. Deployment targets AWS with Kubernetes orchestration. Review chapter-specific infrastructure code before deploying.
