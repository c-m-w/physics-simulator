### tables.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):

    id          = db.Column(db.Integer, primary_key=True)
    email       = db.Column(db.String)
    password    = db.Column(db.String)

# make Level class
#   int id
#   int user_id (user id associated to the level)
#   string title
#   string data
