# application.py
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Base, CatalogItem, Category, User
from flask import session as login_session

app = Flask(__name__, static_folder="../dist",
            template_folder="../src")


engine = create_engine('sqlite:///itemcatalog.db')
Base.metadata.bind = engine

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/games/new", methods=['POST'])
@login_required 
def newGame():
    categories = session.query(Category).all()
    if request.method == 'POST':
        addNewItem = CatalogItem(
            name=request.form['name'],
            description=request.form['description'],
            price=request.form['price'],
            category_id=request.form['category'],
            user_id=login_session['user_id'])
        session.add(addNewItem)
        session.commit()
       
        return status.HTTP_201_CREATED
    else:
        return status.HTTP_400_BAD_REQUEST

@app.route("/api/*")
def catchAllApi():
    # try do 304 redirect to other  content
    return {  "Your lost"}

@app.route("/*")
def catchAll():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
