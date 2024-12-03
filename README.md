Hospital Management System
This repository contains a Hospital Management System with a frontend built using React and a backend built using Django. The backend connects to a PostgreSQL database and includes features such as:

Horizontal Partitioning for hospitals and users based on location, making the system efficient and scalable.
Automatic Hospital Replication, where replica tables for hospitals are dynamically created based on the hospital name.
Serializable Transactions implemented using PostgreSQL and Django to ensure data consistency during concurrent operations.
This system is designed to be verbose and efficient, offering a robust solution for managing hospitals, departments, doctors, and their availability.


Project Structure
hospital_management/
The folder containing the frontend code (React).

DDS_HealthCare/
The folder containing the backend code (Django). Inside this folder:

middleware/healthcare_system/: Contains the main Django app.


