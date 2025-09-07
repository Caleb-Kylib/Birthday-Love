# LibraryProject

This is the first Django project created for the **ALX Backend Specialization**.  
The objective of this task is to set up the Django development environment and create a basic Django project.

---

## Project Setup

1. **Install Django**
   ```bash
   pip install django

   Create project:
django-admin startproject LibraryProject

Navigate into project:
cd LibraryProject


Run migrations:

python manage.py migrate

Start the development server:

python manage.py runserver

Open in browser: http://127.0.0.1:8000/

Project Structure
LibraryProject/
├── LibraryProject/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── README.md

Important Files

manage.py → Command-line tool to run/manage the project

settings.py → Project configuration file

urls.py → URL routing for the project

wsgi.py / asgi.py → Deployment entry points

Author

Name: Lemayian caleb

GitHub: caleb-kylib
