from flask import Flask, redirect, render_template, request, flash
from flask_session import Session
import psycopg2
import re  # For data validation

app = Flask(__name__)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = "your_secret_key"  # Required for flashing messages
Session(app)

# PostgreSQL Database Configuration
DATABASE_CONFIG = {
    'dbname': 'Register',
    'user': 'postgres',
    'password': 'HillCity.dev',
    'host': 'localhost',
    'port': 5432
}

# Helper function to connect to the database
def get_db_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    return conn

# Helper function to validate form inputs
def validate_form_data(form_data):
    errors = []
    # Validation logic...
    return errors

# Routes for the pages
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/events")
def events():
    return render_template("events.html")



@app.route("/contact")
def contact():
    return render_template("contact_us.html")

if __name__ == "__main__":
    app.run(debug=True)
