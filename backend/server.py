### server.py

# setup flask
    # make sure to enable flask cors
# add api routes
    # /api/login POST
    # /api/register POST
from make_response import make_response
from flask import request
from flask import Flask
from tables import *
from flask_cors import CORS


print("hello")
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def default():
    return "hello"

@app.route("/api/register", methods=["POST"])
def register():
    print(request.json)
    username = request.json["email"]
    password = request.json["password"]
    repeated_password = request.json["repeatPassword"]
    if password != repeated_password:
        return make_response(False, "passwords don't match")
    try:
        userQuery = db.session.execute(db.select(User).where(User.username==username)).scalars().one()
    except:
        #todoerror
        db.session.add(User(username = username, password = password))
        db.session.commit()
        return make_response(True)
    
    return make_response(False,"user already registered")

@app.route("/api/login", methods=["POST"])
def login():
    username = request.json["email"]
    password = request.json["password"]
    try:
        userQuery = db.session.execute(db.select(User).where(User.username==username)).scalars().one()
    except:
        #todoerror
        return make_response(False,"user not found")

    if userQuery.password == password:
        return make_response(True)

    print(request.json)
    print(userQuery)
    return make_response(False,"bad password")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="5001")

