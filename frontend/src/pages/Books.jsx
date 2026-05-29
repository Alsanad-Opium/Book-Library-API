import { useState, useEffect } from "react";
import api from '../api/axios';

export default function Books(){

    const [books,setBooks]= useState([])
    const [title,setTitle]= useState([])
    const [author,setAuthor]= useState([])
    const [genre,setGenre]= useState([])
    const [error,setError]= useState([])
    const [editingBook,setEditingBook]= useState(null)
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
    async function loadBooks() {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

    async function fetchBooks(){

        try{
            const response  =  await api.get('/books')
            setBooks(response.data)
        }catch(error){
            setError(error.response?.data?.meassage ||"Failed to fetch books")
        }    finally {
      setLoading(false);
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
        } finally{
          setSubmitting(false);
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
        finally {
      setSubmitting(false);
        }
    }

     function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  }

   const genreColors = {
    Technology: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Fiction: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Comedy: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Science: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    History: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    default: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  function getGenreColor(genre) {
    return genreColors[genre] || genreColors.default;
  }
    return(
        <div className="min-h-screen bg-black">

      {/* Page content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold">Your Library</h1>
          <p className="text-zinc-400 text-sm mt-1">
            {books.length} {books.length === 1 ? "book" : "books"} in your collection
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Total books</p>
            <p className="text-violet-400 text-2xl font-semibold">{books.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Genres</p>
            <p className="text-teal-400 text-2xl font-semibold">
              {new Set(books.map((b) => b.genre)).size}
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Added this month</p>
            <p className="text-amber-400 text-2xl font-semibold">
              {books.filter((b) => {
                const created = new Date(b.created_at);
                const now = new Date();
                return (
                  created.getMonth() === now.getMonth() &&
                  created.getFullYear() === now.getFullYear()
                );
              }).length}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add book form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
          <h2 className="text-white text-sm font-medium mb-4">Add new book</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Title</label>
              <input
                type="text"
                placeholder="Book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Author</label>
              <input
                type="text"
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Genre</label>
              <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={submitting || !title || !author || !genre}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {submitting ? "Adding..." : "Add book"}
          </button>
        </div>

        {/* Edit modal */}
        {editingBook && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-white font-semibold mb-4">Edit book</h2>
              <div className="flex flex-col gap-3 mb-5">
                <div>
                  <label className="text-zinc-400 text-xs mb-1.5 block">Title</label>
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 text-xs mb-1.5 block">Author</label>
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 text-xs mb-1.5 block">Genre</label>
                  <input
                    type="text"
                    value={editingBook.genre}
                    onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  disabled={submitting}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  {submitting ? "Saving..." : "Save changes"}
                </button>
                <button
                  onClick={() => setEditingBook(null)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Books grid */}
        {loading ? (
          <div className="text-zinc-500 text-sm text-center py-12">Loading books...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-sm">No books yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">
                        {book.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{book.title}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{book.author}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border flex-shrink-0 ${getGenreColor(book.genre)}`}>
                    {book.genre}
                  </span>
                </div>

                <div className="flex gap-2 pt-3 border-t border-zinc-800">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="flex-1 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 text-xs py-1.5 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="flex-1 text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-xs py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}