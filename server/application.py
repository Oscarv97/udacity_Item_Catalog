from flask import Flask, send_from_directory, url_for, request, redirect, jsonify, make_response
from flask import session as login_session
from sqlalchemy import asc, create_engine
from sqlalchemy.orm import sessionmaker
import os
import json
from database_setup import Base, Category, CategoryItem, User
import firebase_admin
from firebase_admin import credentials

app = Flask(__name__, static_folder="./public/js/")


engine = create_engine('sqlite:///itemcatalog.db')
Base.metadata.bind = engine

# Create database session
DBSession = sessionmaker(bind=engine)
session = DBSession()

cred = credentials.Certificate(
    "../../../Documents/udacityKey/oscarudacityitemcatalog-firebase-adminsdk-mixjn-dde0d6cc72.json")
firebase_admin.initialize_app(cred)

fakeData = """[{"category":"Test","id":1,"name":"Test Item","category_id":1,"description":"Test Description ","user":"Oscar","user_id":1},
            {"category":"Test","id":1,"name":"Test Item2","category_id":1,"description":"Test Description ","user":"Oscar","user_id":1},
            {"category":"Test2","id":1,"name":"Test Item3","category_id":1,"description":"Test Description ","user":"Oscar","user_id":1,
            "isSelected":true},{"category":"Test2","id":1,"name":"Test Item4","category_id":1,"description":"Test Description ","user":"Oscar","user_id":1}]"""

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/all/")
def getAll():
    return jsonify(json.loads(fakeData))

@app.route("/api/games/new", methods=['POST'])
def newGame():
    if 'token' not in session:
        return status.HTTP_401_UN_AUTHORIZED

    categories=session.query(Category).all()
    if request.method == 'POST':
        addNewItem=CategoryItem(
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

# Display a Specific Item
@app.route('/api/catalog/<path:category_name>/<path:item_name>/')
def showItem(category_name, item_name):
    category = session.query(Category).filter_by(name=category_name).one()
    item = session.query(Item).filter_by(name=item_name,\
                                        category=category).one()
    return jsonify(item=[item.serialize])

@app.route("/api/*")
def catchAllApi():
    # try do 304 redirect to other  content
    return {"Your lost"}


@app.route("/*")
def catchAll():
    return url_for("/#/404/")


def login_required(id_token):
    # id_token comes from the client app (shown above)
    decoded_token=auth.verify_id_token(id_token)
    uid=decoded_token['uid']


if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True)
