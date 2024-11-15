# Contact Management System

## Project Description

This Contact Management System is a full-stack web application designed to help users efficiently manage their contacts. It provides a user-friendly interface for adding, viewing, updating, and deleting contact information. The system is built with modern web technologies, ensuring a responsive and intuitive user experience.

## Features

- Add new contacts with details such as name, email, phone, company, and job title
- View a list of all contacts with sorting and pagination
- Edit existing contact information
- Delete contacts
- Responsive design for both desktop and mobile use

## Technology Stack

- Frontend: React with TypeScript, Material-UI
- Backend: Node.js with Express and TypeScript
- Database: PostgreSQL
- ORM: Prisma
- API Validation: Zod

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

### Database Setup

1. Create a new PostgreSQL database for the project.
2. Then, You need to copy the PostgresSQL connecton string.

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/IamAbhinavSINGH/Contact-Management.git
   cd Contact-Management/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL="postgresql-connection-url"
   PORT=3001
   ```

4. Run Prisma migrations to set up your database schema:
   ```
   cd prisma
   npx prisma migrate dev
   ```

5. Make sure that you are in the server folder and then you can start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

## Project Structure

- `/backend`: Contains the Node.js/Express server and API endpoints
  - `/src`: TypeScript source files
  - `/prisma`: Prisma schema and migrations
- `/frontend`: React application
  - `/src`: React components and TypeScript files
  - `/public`: Static assets

## How it works

### Backend

1. **Server Setup**: The Express server is set up in `backend/src/index.ts`. It uses middleware for CORS and JSON parsing.

2. **Database Connection**: Prisma is used to connect to the PostgreSQL database. The connection is established when the server starts.

3. **API Endpoints**: 
   - GET /contacts: Retrieves all contacts
   - POST /contacts: Creates a new contact
   - PUT /contacts/:id: Updates an existing contact
   - DELETE /contacts/:id: Deletes a contact

4. **Data Validation**: Zod is used to validate incoming data for creating and updating contacts.

### Frontend

1. **App Component**: The main component that renders the header, contact form, and contact table.

2. **ContactForm Component**: Handles the creation and updating of contacts. It uses Material-UI components for a consistent look and feel.

3. **ContactTable Component**: Displays the list of contacts with sorting and pagination. It also provides options to edit or delete contacts.

4. **API Integration**: Axios is used to make HTTP requests to the backend API.


## Major Technical Decisions

1. **TypeScript**: Used throughout the project for type safety and improved developer experience.

2. **Prisma**: Chosen as the ORM for its type-safe database access and easy-to-use migration system.

3. **Zod**: Implemented for runtime type checking and validation on the backend, ensuring data integrity.

4. **Express**: Used on the backend for its simplicity and wide community support.
