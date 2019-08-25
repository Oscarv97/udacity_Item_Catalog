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


@app.route("/items/api/v1.0/all/")
def getAll():
    allGames = session.query(CategoryItem).all()
    return jsonify(allGames=[g.serialize for g in allGames])


@app.route("/items/api/v1.0/games/new/", methods=['POST'])
def newGame():
    if request.method == 'POST':
        req_data = request.get_json(force=True)
      
        categoryname = req_data["category"]
        print("category name " + categoryname)
        category = session.query(Category).filter_by(name=categoryname).one()
        # print(json.dumps(req_data))

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
@app.route('/items/api/v1.0/games/<int:item_id>/update/', methods=['PUT'])
def update_task(name):

    games = session.query()
    game = [game for game in games if game['id'] == task_id]
    if len(game) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'title' in request.json and type(request.json['name']) != unicode:
        abort(400)
    if 'description' in request.json and type(request.json['description']) is not unicode:
        abort(400)
    if 'done' in request.json and type(request.json['done']) is not bool:
        abort(400)
    game[0]['name'] = request.json.get('name', game[0]['name'])
    game[0]['description'] = request.json.get(
        'description', game[0]['description'])
    game[0]['done'] = request.json.get('done', game[0]['done'])
    return jsonify({'game': game[0]})


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


def login_required(id_token):
    # id_token comes from the client app (shown above)
    decoded_token = auth.verify_id_token(id_token)
    uid = decoded_token['uid']


if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True)
