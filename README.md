# Hospital Management System

This repository contains a Hospital Management System with a frontend built using React and a backend built using Django. The backend connects to a PostgreSQL database and includes features such as horizontal partitioning for hospitals and users based on location, automatic hospital replication, and serializable transactions to ensure data consistency during concurrent operations. This system is designed to be verbose and efficient, offering a robust solution for managing hospitals, departments, doctors, and their availability.

## Project Structure

- **hospital_management/**: The folder containing the frontend code (React).
- **DDS_HealthCare/**: The folder containing the backend code (Django). Inside this folder:
  - **middleware/healthcare_system/**: Contains the main Django app.

## Prerequisites

Ensure you have the following installed:
- Node.js and npm (for the frontend).
- Python 3.9+ and pip (for the backend).
- PostgreSQL (for the database).
- django (for middleware and API's)

## Steps to Run the Project

### Frontend (React)

1. Navigate to the `hospital_management/` folder:
    ```bash
    cd hospital_management
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open the browser at http://localhost:3000 (default port for Vite).

### Backend (Django)

1. Navigate to the Django app directory:
    ```bash
    cd DDS_HealthCare/middleware/healthcare_system
    ```
2. Install the dependencies (use a virtual environment if needed):
    ```bash
    pip install -r requirements.txt
    ```
3. Set up the PostgreSQL database:
    - Ensure PostgreSQL is running.
    - Create a database named `hospital_management` (or the name specified in settings.py).
    - Update the database credentials in settings.py.
4. Apply migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
5. Run the Django development server:
    ```bash
    python manage.py runserver
    ```
    The backend will be available at http://localhost:8000.

## Database Setup (PostgreSQL)

1. Ensure PostgreSQL is running.
2. The system will automatically create replica tables for hospitals in the format:
    ```sql
    hospital_<hospital_name_here>_replica
    ```
    Example:
    ```sql
    hospital_Gilbert_Regional_Medical_Center_replica
    ```

