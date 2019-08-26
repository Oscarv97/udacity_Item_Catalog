import os
import json
import flask_cors
from flask import Flask, send_from_directory, url_for
from flask import request, redirect, jsonify, make_response
from flask import session as login_session
from sqlalchemy import asc, create_engine
from sqlalchemy.orm import sessionmaker
import google.auth.transport.requests
import google.oauth2.id_token
import requests_toolbelt.adapters.appengine
from database_setup import Base, Category, CategoryItem, User

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.

HTTP_REQUEST = google.auth.transport.requests.Request()

app = Flask(__name__, static_folder="./public/js/")


engine = create_engine('sqlite:///itemcatalog.db')
Base.metadata.bind = engine

# Create database session
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/items/api/v1.0/all/")
def getAll():
    allGames = session.query(CategoryItem).all()
    return jsonify(allGames=[g.serialize for g in allGames])


# check Auth then create new game
@app.route("/items/api/v1.0/games/new/", methods=['POST'])
def newGame():
    req_data = request.get_json(force=True)
    # Verify Firebase auth.
    # [START verify_token]
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST)
    if not claims:
        return 'Unauthorized', 401
    # [END verify_token]

    if request.method == 'POST':
        categoryname = req_data["category"]
        category = session.query(Category).filter_by(name=categoryname).one()
        addNewItem = CategoryItem(
            id=req_data["id"],
            name=req_data['name'],
            description=req_data['description'],
            category=category,
            user_id=req_data['user_id'])
        session.add(addNewItem)
        session.commit()

        return send_from_directory(app.static_folder, 'index.html')
    else:
        return make_response(jsonify(req_data), 400)


# Display a Specific Item
@app.route('/items/api/v1.0/getgame/<path:category_name>/<path:item_id>/')
def showItem(category_name, item_id):
    item = session.query(Category).filter_by(category_name=category_name, 
                                            name=item_id,).one()
    return jsonify(item=[item.serialize])


# Update Item
@app.route('/items/api/v1.0/games/<int:item_id>/update/', methods=['POST'])
def update_task(item_id):  
    req_data = request.get_json(force=True)
    # Verify Firebase auth.
    # [START verify_token]
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST)
    if not claims:
        return 'Unauthorized', 401
    # [END verify_token]

    gameToEdit = session.query(CategoryItem).filter_by(id=item_id).one()
    categoryname = req_data["category"]
    category = session.query(Category).filter_by(name=categoryname).one()
    if request.method == 'POST':
        if req_data['name']:
            gameToEdit.name = req_data['name']
        if req_data['description']:
            gameToEdit.description = req_data['description']
            gameToEdit.category = category
        session.add(gameToEdit)
        session.commit()
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return make_response(jsonify(req_data), 400)


# Delete Item
@app.route('/items/api/v1.0/games/<int:item_id>/delete/', methods=['POST'])
def delete_task(item_id):
    print(request.headers)
     # Verify Firebase auth.
    # [START verify_token]
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST)
    if not claims:
        return 'Unauthorized', 401
    # [END verify_token]
    
    if request.method == 'POST':
        itemToDelete = session.query(CategoryItem).filter_by(id=item_id).one()
        session.delete(itemToDelete)
        session.commit()
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return make_response(jsonify({'error': 'Bad Request'}), 400)


@app.route("/items/api/v1.0/*")
def catchAllApi():
    # try do 304 redirect to other  content
    return {"Your lost"}


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True)
