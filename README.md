# NestJS Trello-like Tasks App

This is a simple mock Trello application built with NestJS and Mongoose.

## Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <project-folder>
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root folder and add your MongoDB URL:
```bash
DATABASE_URL=mongodb://localhost:27017/tasks-app
```

## Running the app
For development, run:
```bash
npm run start:dev
```
The application will be available at http://localhost:3000

## Testing
Unit tests can be run with:
```bash
npm run test
```
