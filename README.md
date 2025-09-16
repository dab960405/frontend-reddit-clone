Reddit Clone - Frontend
A Reddit clone built with Angular that replicates the main functionalities of the popular social media platform.
🚀 Demo
🌐 View Live Application https://frontend-reddit-clone-o23t.vercel.app/

📋 Features

Home Page - Main view with posts feed
Post View - Detailed page for each post with comments
Create Post - Form to create new posts
Create Subreddit - Create new communities
User Profile - Personal profile page
Authentication System - User login and registration
Voting System - Upvotes and downvotes on posts and comments

🛠️ Technologies

Angular (CLI v8.3.4)
TypeScript
RxJS for observables handling
Angular Router for navigation
Angular Forms for reactive forms
HTTP Client for API communication

🏗️ Architecture
This frontend communicates with a Spring Boot backend that provides:

RESTful APIs
JWT Authentication
User, post, and community management

Backend Repository: backend-reddit-clone
🚀 Deployment
The application is deployed on Vercel, leveraging its excellent Angular integration and global CDN for optimal performance.
Production Stack

Frontend: Vercel
Backend: Render
Database: Aiven (MySQL)

💻 Local Development
Prerequisites

Node.js (v12 or higher)
npm or yarn
Angular CLI

Installation

Clone the repository

bashgit clone https://github.com/dab960405/frontend-reddit-clone.git
cd frontend-reddit-clone

Install dependencies

bashnpm install

Configure environment variables

bash# Create an environment.ts file in src/environments/
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api' // Your local backend URL
};

Start the development server

bashng serve

Navigate to http://localhost:4200/

Available Commands
bash# Development server
ng serve

# Generate component
ng generate component component-name

# Production build
ng build --prod

# Run tests
ng test

# End-to-end tests
ng e2e

🔧 Configuration
Environment Variables
For local development, configure src/environments/environment.ts:
typescriptexport const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
For production, configure src/environments/environment.prod.ts:
typescriptexport const environment = {
  production: true,
  apiUrl: 'https://your-backend.render.com/api'
};
🚀 Deployment on Vercel

Connect your repository with Vercel
Configure environment variables in Vercel dashboard
Vercel will automatically detect it's an Angular project
Deployment will run automatically on each push to main

🤝 Contributing

Fork the project
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
