# application.py
from flask import Flask, render_template, jsonify
import random

app = Flask(__name__, static_folder="../dist",
            template_folder="../src")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/catalog")
def catalog():
    return "Welcome to the catalog"

@app.route("/hello")
def hello():
    return get_hello()

def get_hello():
    greetings_list = ["hi", "hello", "Hola", "Test"]
    return random.choice(greetings_list)

if __name__ == "__main__":
    app.run()

@app.route("/api/car")
def getCars():
    return ""

@app.route("/api/*")
def catchAllApi():
    return { status: "Your lost"}

@app.route("*")
def catchAll():
    return render_template("index.html")