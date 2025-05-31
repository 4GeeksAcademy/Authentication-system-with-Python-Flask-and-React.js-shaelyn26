"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/login', methods=['POST'])
def handle_login():
    email_value = request.json.get("email")
    password_value = request.json.get("password")
    find_user = User.query.filter_by(email=email_value).first()

    # <--this will return a true or false about password that was entered-->
    if not check_password_hash(find_user.password, password_value):

        return jsonify("login failed!")

    token = create_access_token(identity = email_value)
         # ^--this creates 'token' for you,--->  <--- the [identity=email] gives access to the 'User'-->

    return jsonify(token_value=token), 200


@api.route('/signup', methods=['POST'])
def sign_up():
    email = request.get_json("email")
    password = request.get_json("password")
    if User.query.filter_by(email = email).first():
        return jsonify({"message" : "email already exists"}), 409   
    hashed_password=generate_password_hash(password)


    new_user = User(
        email=email,
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user created"}), 200
    
