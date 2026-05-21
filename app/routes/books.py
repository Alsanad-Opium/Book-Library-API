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


@books_bp.route('/<int:id>', methods = ['GET'])

def get_book(id):
    
    book  = Books.query.get(id)
    
    if book is None:
        return jsonify({"message":"Book not found"}),404
    
    return jsonify(book.to_dict()),200


books_bp.route('/',methods = ['POST'])

def create_book():
    data = request.get_json()
    
    if not data['title'] or not data['author'] or not data['genre']:
        return jsonify({"message": "title, author and genre are required fields"}),400
    
    book = Books(
        title = data['title'],
        author = data['author'],
        genre = data["genre"]
    )
    
    db.session.add(book)
    db.session.commit()
    
    return  jsonify({"message": "Book added succesfully" , "book": book.to_dict()}),201
