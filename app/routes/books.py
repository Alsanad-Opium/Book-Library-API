from flask import Blueprint, request, jsonify
from app.models import Books
from app import db


books_bp = Blueprint('books',__name__,url_prefix = "/api/books")


## methods for the route are 
# get all books
# get one book by id
# create a book
#put /update a book by id
#delete a book by id 

@books_bp.route('/',methods = ['GET'])

def get_books():
    books = Books.query.all() # gets all the books from the db (books table) and return a list of book objects
    
    if books is None:
        return jsonify({"message":"No books found"}),404
    return jsonify([book.to_dict() for book in books]), 200