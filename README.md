# Khamari Bazar - E-Commerce Platform

Welcome to the **Khamari Bazar** repository! 

Khamari Bazar is a wholesale meat processing and delivery e-commerce platform built with Django. It supplies quality meat (Chicken, Beef, Mutton, and more) to local markets and individual customers, ensuring the highest quality standards.

---

## 🚀 Features

- **Storefront & Product Catalog**: Browse different categories of meat including Chicken, Beef, Mutton, and Others.
- **Cart System**: A sleek, LocalStorage-powered shopping cart that allows users to add, remove, and adjust quantities of items dynamically without page reloads.
- **User Authentication**: Secure user login, logout, and registration system.
- **Email Verification**: Automated SMTP integration (configured for MailerSend/Brevo) to send account activation emails upon user signup.
- **Checkout & Shipping**: Secure checkout process that collects user address and shipping details, creating structured orders in the database.
- **Responsive UI**: A modern, mobile-friendly interface styled with Bootstrap 5 and customized CSS.

---

## 🛠️ Technology Stack

- **Backend Framework**: [Django](https://www.djangoproject.com/) (Python 3)
- **Database**: SQLite3 (Development)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Bootstrap 5
- **Forms**: `django-crispy-forms` with `crispy-bootstrap5` for elegant form rendering.
- **Email Handling**: `django.core.mail` with secure SMTP relay configurations.

---

## 💻 Local Setup & Installation

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Python 3.8+
- pip (Python package installer)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd khamari-bazar
```

### 3. Create a Virtual Environment
It is highly recommended to use a virtual environment to manage dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 4. Install Dependencies
Install all required packages from `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables / Settings
If you are planning to test the **Signup Email Activation** feature, ensure your SMTP credentials in `khamari_bazar/settings.py` are up to date:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mailersend.net'  
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '<your-smtp-username>'
EMAIL_HOST_PASSWORD = '<your-smtp-password>'
```
*(Alternatively, you can switch `EMAIL_BACKEND` to the console backend for local testing without an email server).*

### 6. Apply Migrations
Set up your SQLite database by applying the Django migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create a Superuser (Optional)
To access the Django Admin panel and manage products, create a superuser account:
```bash
python manage.py createsuperuser
```

### 8. Run the Development Server
Start the local development server:
```bash
python manage.py runserver
```
Navigate to `http://127.0.0.1:8000/` in your web browser to view the application!

---

## 📁 Project Structure

- **`khamari_bazar/`**: The core Django project settings and root URL configurations.
- **`App_Shop/`**: The primary e-commerce application handling products, cart templates, and order management.
- **`App_Login/`**: The authentication application handling user registration, profiles, and login sessions.
- **`templates/`**: Global HTML templates including the base layout (`base.html`).
- **`static/`**: Global static assets (CSS, JS, Fonts, Images). Includes the core `cart.js`, `order.js`, and `main.js` scripts.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is open-source and available under the MIT License.
