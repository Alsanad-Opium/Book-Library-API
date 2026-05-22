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

# Fetches ll the books from the db
def get_books():
    books = Books.query.all() # gets all the books from the db (books table) and return a list of book objects
    
    if books is None:
        return jsonify({"message":"No books found"}),404 # if db is empty
    return jsonify([book.to_dict() for book in books]), 200# retunrs a list of dict where each dict represents a book


@books_bp.route('/<int:id>', methods = ['GET'])


# fetches  the book for the id given in the url
def get_book(id):
    
    book  = db.session.get(Books,id) #  gets the book with the given id 
    
    if book is None:
        return jsonify({"message":"Book not found"}),404
    
    return jsonify(book.to_dict()),200  #return the dict format for the book 


books_bp.route('/',methods = ['POST'])

# creates the book with the data give n in the request body from the frontend or postman
def create_book():
    data = request.get_json()
    
    if not data['title'] or not data['author'] or not data['genre']: # chek whether the required fied are provided or not as they are required in the db 
        return jsonify({"message": "title, author and genre are required fields"}),400
    
    book = Books(
        title = data['title'],
        author = data['author'],
        genre = data["genre"]
    ) # create a book object witht the data provided in the request body using the Books model constructor
    
    db.session.add(book) # add the book object to the db session 
    db.session.commit() # save the changes to db and commit transaction
    
    return  jsonify({"message": "Book added succesfully" , "book": book.to_dict()}),201


books_bp.route('./<int:id>',methods = ['PUT']) 

# updates the book with the given id and put the new data in the book object if available or the old value stays 
def update_book(id):
    book = db.session.get(Books, id)
    
    if book is None:
        return jsonify({"message": "Enter a valid book number"}),401
    
    data = request.get_json()
    
    book.title  = data.get('title',book.title) 
    book.author = data.get('author',book.author)
    book.genre = data.get('genre',book.genre)
    # this will update the title of the book if the title is provided in the request body otherwise it will keep the old title as it is
   
    db.session.commit()
    
    return jsonify({'message': "book has been Updated succcessfully ", 'book':book.to_dict()}),200


books_bp.route('/<int:id>',methods = ['DELETE'])
# Delete the book with the given id from the db 
def delete_book(id):
    
    book = db.session.get(Books, id)
    
    if book is None:
        return jsonify({"message": "Book not found"}),404
    
    db.session.delete(book)
    db.session.commit()
    
    return jsonify({'message':"Book has been deleted successfully"}),200