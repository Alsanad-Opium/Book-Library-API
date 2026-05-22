from app import db
from datetime import datetime, timezone
class Books(db.Model):
    
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key =True)
    title =db.Column(db.String(100), nullable = False)
    author =db.Column(db.String(100), nullable = False)
    genre = db.Column(db.String(50), nullable = False)
    published_date = db.Column(db.DateTime, nullable = False, default = datetime.now(timezone.utc))
    
    
    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "genre": self.genre,
            "published_date": self.published_date
        }
    
    
    def __repr__(self):
        return f" Book = {self.title}, Author = {self.author}, Genre = {self.genre}, Published Date = {self.published_date}"

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),nullable  = False, unique = True)
    email = db.Column(db.String(100),nullable  = False, unique = True)
    password = db.Column(db.String(225), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False, default = datetime.now(timezone.utc))
    
    
   
    def to_dict(self):
        return{
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at
        }
        
    def __repr__(self):
        return f"User ={self.username}, Email = {self.email}, Created At = {self.created_at}"