from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_cors import CORS





load_dotenv() ## load the var from .env

db =SQLAlchemy() # create db instance at module level so it can be imported in other modules

migrate = Migrate() 
# create migrate module at modeul level so can be used by other modules  
#it is used to handle database migration that is handle the changing of the database schema like the add columns rename columns and delete columns without losing the data in the database 

jwt = JWTManager() 
#object that is used to handle the jwt authentication in the app it is used to create and verify the jwt tokens and also to handle the jwt related errors

bcrypt = Bcrypt() 
# object that is used to handle the password hashing and checking in the app it is used to hash the password before storing it in the database and also to check the password when the user login

def create_app():
    
    app = Flask(__name__)
    app.config.from_object('config.Config')#load the config from config.py and using the config class to laod the config for the app 
    
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "https://book-library-api-five.vercel.app"]}})
    
    db.init_app(app) # initialize the db with the app can be used by other modules to interact with the database 
    migrate.init_app(app,db) # same as above just for migration 
    jwt.init_app(app)
    bcrypt.init_app(app)
    from app.routes.books import books_bp
    from app.routes.auth import auth_bp
    from app import models# import the blueprint from the routes module to register it with the app
    app.register_blueprint(books_bp) # register the blueprint with the app to make the routes defined in the blueprint available to the app
    app.register_blueprint(auth_bp) # register the blueprint with the app to make the routes defined in the blueprint available to the app
    
    return app