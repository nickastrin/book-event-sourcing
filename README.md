# Book Tracker & Activity Log
A modern, high-performance full-stack book management platform. This application leverages **Event Sourcing** to provide a highly consistent, auditable, and blazing-fast activity log for your library.

## 🚀 Key Features
- **Event-Sourced Activity Log**: Every change to a book's state is captured as a sequence of events using Marten and PostgreSQL, ensuring a 100% reliable audit trail.
- **High-Performance Filtering**: Optimized read-side state reconstruction allows for instant library searching and filtering.
- **Modern Tech Stack**: Built using the latest stable releases of .NET 9 and React 19.

## 🛠️ Tech Stack
 - **Frontend**: React 19, TypeScript, Tailwind CSS.
 - **Backend**: .NET 9 Web API
 - **Database & Event Store**: PostgreSQL powered by Marten
 - **Containerization**: Docker (for local database setup)
 - **Responsive UI**: A clean, minimal interface for managing books and authors seamlessly.

## 💻 Getting Started
Follow these steps to get the application running locally.

Prerequisites
Ensure you have the following installed on your machine:

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/en) (v18+ recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Database Setup
Spin up the PostgreSQL instance via Docker Compose:

```bash
docker-compose up -d
```

### 2. Backend Setup
Navigate to the backend directory, restore dependencies, and run the API using the HTTPS profile:

```bash
cd backend
dotnet restore
dotnet run --launch-profile https
```

*The API should now be running*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

*Open your browser and navigate to the local server address provided in your terminal*
