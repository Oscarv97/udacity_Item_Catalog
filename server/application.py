# application.py
from flask import FLask, render_template

app = Flask(__name__, static_folder="../dist",
template_folder="../src")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/catalog")
    def catalog(): 
        return "Welcome to the catalog"

if __name__ == "__main__"
app.run();