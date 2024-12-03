# Hospital Management System

This repository contains a **Hospital Management System** with the following key features:

- **Horizontal Partitioning**: Efficient data organization for hospitals and users based on their location, enhancing scalability and performance.
- **Automatic Hospital Replication**: Replica tables for hospitals are dynamically created in the format `hospital_<hospital_name_here>_replica`.
- **Serializable Transactions**: Ensures data consistency during concurrent operations, such as booking appointments, using PostgreSQL's transaction isolation level and Django's ORM.

The system comprises a **React-based frontend** and a **Django-powered backend** connected to a PostgreSQL database. This project is designed to be robust, verbose, and efficient, making it ideal for managing hospitals, departments, doctors, and their availability.

---

## Project Structure

### `hospital_management/`
Contains the **frontend code** developed using React.

### `DDS_HealthCare/`
Contains the **backend code** developed using Django. The key folder:
- **`middleware/healthcare_system/`**: Core Django app managing the backend logic.

---

## Prerequisites

Ensure you have the following installed:

1. **Node.js** and **npm** (for the frontend).
2. **Python 3.9+** and **pip** (for the backend).
3. **PostgreSQL** (for the database).

---

## Steps to Run the Project

### Frontend (React)

1. Navigate to the `hospital_management/` folder:
   ```bash
   cd hospital_management
