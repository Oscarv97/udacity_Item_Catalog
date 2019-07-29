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

@app.route("/api/games/<int:category_id>/")
def getGames():
    return ""

@app.route("/api/*")
def catchAllApi():
    # try do 304 redirect to relivent content
    return { status: "Your lost"}

@app.route("*")
def catchAll():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()