import os
import json
from flask import Flask, send_from_directory, url_for
from flask import request, redirect, jsonify, make_response
from flask import session as login_session
from sqlalchemy import asc, create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Category, CategoryItem, User

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


@app.route("/items/api/v1.0/games/new/", methods=['POST'])
def newGame():
    if request.method == 'POST':
        req_data = request.get_json(force=True)
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
@app.route('/api/catalog/<path:category_name>/<path:item_name>/')
def showItem(category_name, item_name):
    category = session.query(category_name).filter_by(name=category_name).one()
    item = session.query(item_name).filter_by(name=item_name,
                                              category=category).one()
    return jsonify(item=[item.serialize])


# Update Item
@app.route('/items/api/v1.0/games/<int:item_id>/update/', methods=['POST'])
def update_task(item_id):
    gameToEdit = session.query(CategoryItem).filter_by(id=item_id).one()
    req_data = request.get_json(force=True)
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
