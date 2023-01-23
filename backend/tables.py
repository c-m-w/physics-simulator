### tables.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):

    id          = db.Column(db.Integer, primary_key=True)
    email       = db.Column(db.String)
    password    = db.Column(db.String)

# make Level class
class Level(db.Model):

    id          = db.Column(db.Integer, primary_key=True)
    user_id     = db.Column(db.Integer)
    data        = db.Column(db.String)
    name        = db.Column(db.String)


