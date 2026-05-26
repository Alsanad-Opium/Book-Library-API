import { useState, useEffect } from "react";
import api from '../api/axios';

export default function Books(){

    const [books,setBooks]= useState([])
    const [title,setTitle]= useState([])
    const [author,setAuthor]= useState([])
    const [genre,setGenre]= useState([])
    const [error,setError]= useState([])
    const [editingBook,setEditingBook]= useState(null)

    useEffect(()=>{
        fetchBooks();
    })

    async function fetchBooks(){

        try{
            const response  =  await api.get('/books')
            setBooks(response.data)
        }catch(error){
            setError(error.response?.data?.meassage ||"Failed to fetch books")
        }
        }

    async function handleCreate(){

        try{
             await api.post('/books', {title, author,genre})
                setTitle('')
                setAuthor('')
                setGenre('')
                fetchBooks()
        }catch(err){

            setError(error.response?.data?.meassage ||"Failed to create book")
        }
       
    }
        
    async function handleDelete(id){
        try{

            await api.delete(`/books/${id}`)
            fetchBooks()
        }catch(err){

            setError(error.response?.data?.meassage ||"Failed to delete book")
        }

    }

    async function handleUpdate(id){

        try{
            await api.put(`/books/${editingBook.id}`,{title: editingBook.title,author: editingBook.author,genre: editingBook.genre})
            setEditingBook(null)
            fetchBooks()
        }   catch(err){

            setError(error.response?.data?.meassage ||"Failed to update book")

        }
    }

    return(
        <div>
      <div>
        <h2>Book Library</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Book Form */}
      <div>
        <h3>Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button onClick={handleCreate}>Add Book</button>
      </div>

      {/* Edit Book Form */}
      {editingBook && (
        <div>
          <h3>Edit Book</h3>
          <input
            type="text"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editingBook.author}
            onChange={(e) =>
              setEditingBook({ ...editingBook, author: e.target.value })
            }
          />
          <input
            type="text"
            value={editingBook.genre}
            onChange={(e) =>
              setEditingBook({ ...editingBook, genre: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}

      {/* Books List */}
      <div>
        <h3>All Books</h3>
        {books.length === 0 ? (
          <p>No books found. Add one above.</p>
        ) : (
          books.map((book) => (
            <div key={book.id}>
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <button onClick={() => setEditingBook(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
    )
}