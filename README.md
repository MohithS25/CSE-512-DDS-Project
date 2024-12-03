**Hospital Management System**
This repository contains a Hospital Management System with a frontend built using React and a backend built using Django. The backend connects to a PostgreSQL database and includes features such as:

**Horizontal Partitioning** for hospitals and users based on location, making the system efficient and scalable.
**Automatic Hospital Replication**, where replica tables for hospitals are dynamically created based on the hospital name.
**Serializable Transactions** implemented using PostgreSQL and Django to ensure data consistency during concurrent operations.

**Project Structure**
hospital_management/
The folder containing the frontend code (React).

DDS_HealthCare/
The folder containing the backend code (Django). Inside this folder:

middleware/healthcare_system/: Contains the main Django app.


**Prerequisites**
Ensure you have the following installed:

Node.js and npm (for the frontend).
Python 3.9+ and pip (for the backend).
PostgreSQL (for the database).
Django (for middleware API's).

---**Steps to Run the Project**
---Frontend (React)
---Navigate to the hospital_management/ folder:
  ---cd hospital_management
---Install dependencies:
  ---npm install
---Start the development server:
  ---npm run dev
---Open the browser at http://localhost:3000 (default port for Vite).

---**Backend (Django)**
---Navigate to the Django app directory:

  ---cd DDS_HealthCare/middleware/healthcare_system
---Install the dependencies (use a virtual environment if needed):
  ---pip install -r requirements.txt

---**Set up the PostgreSQL database:**

---Ensure PostgreSQL is running.
---Create a database named hospital_management (or the name specified in settings.py).
---Update the database credentials in settings.py.
---Apply migrations:

  ---python manage.py makemigrations
  ---python manage.py migrate
Run the Django development server:

  ---python manage.py runserver
The backend will be available at http://localhost:8000.






