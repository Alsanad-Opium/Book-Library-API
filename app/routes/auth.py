from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models import User
from app import db, bcrypt



auth_bp = Blueprint('auth',__name__, url_prefix = "/api/auth")

@auth_bp.route('/register',methods = ["POST"])

def register():
    data = request.get_json()
    
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Username email and password are required fields"}),400
    
    existing_email = User.query.filter_by(email = data['email']).first()
    existing_username = User.query.filter_by(username = data['username']).first()
    
    if existing_email or existing_username:
        return jsonify({"message": "Email or username already exists"}),409
    
    hashed_password =  bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
        username = data['username'],
        email = data['email'],
        password = hashed_password
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "USer added successfully ", "user": user.to_dict()}),201
    

@auth_bp.route('/login', methods =['POST'])

def login():
    
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password are required '}),400
    
    user = User.query.filter_by(email = data['email']).first()
    
    if not user or not  bcrypt.check_password_hash(user.password, data['password']):

        return jsonify({'message': 'Invalid email or password'}), 401

    access_token  = create_access_token(identity = user.id)
    
    
    return jsonify({
                    'access_token': access_token,
                    'message': "Login successful",
                    'user': user.to_dict() }), 200
        