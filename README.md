# TaskFlow Sample Code

This is the companion code repository for **The Full Stack** book. It contains the complete TaskFlow project management application built throughout the book.

## Repository Structure

```
taskflow-sample/
├── frontend/          # React + TypeScript frontend
├── backend/           # Ruby on Rails API
├── infrastructure/    # Terraform, Kubernetes configs
└── docs/             # Additional documentation
```

## Getting Started

Each chapter of the book corresponds to a tagged version of this repository. You can checkout specific chapters:

```bash
git checkout chapter-01  # Chapter 1 code
git checkout chapter-03  # Chapter 3 code
# etc.
```

## Prerequisites

- Node.js 20+ and npm
- Ruby 3.2+ and Bundler
- PostgreSQL 16
- Docker Desktop
- AWS CLI (for deployment chapters)

## Quick Start

Detailed setup instructions are in the book, but here's a quick overview:

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
bundle install
rails db:setup
rails server
```

### Full Stack with Docker
```bash
docker-compose up
```

## Chapters

- **Chapter 1**: Technology stack overview and setup
- **Chapter 2**: Architecture fundamentals
- **Chapter 3**: Frontend with React & TypeScript
- **Chapter 4**: Backend with Ruby on Rails
- **Chapter 5**: API design and integration
- **Chapter 6**: Testing across the stack
- **Chapter 7**: Docker containerization
- **Chapter 8**: Infrastructure as code with Terraform
- **Chapter 9**: Kubernetes deployment
- **Chapter 10**: CI/CD with GitHub Actions
- **Chapter 11**: Monitoring and observability
- **Chapter 12**: Security best practices
- **Chapter 13**: Performance optimization
- **Chapter 14**: Development workflow
- **Chapter 15**: Production deployment

## Contributing

Found an issue or have a suggestion? Please open an issue or submit a pull request!

## License

MIT License - See LICENSE file for details

## Book

Get the full book at [link to book]
