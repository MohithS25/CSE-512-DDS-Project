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




