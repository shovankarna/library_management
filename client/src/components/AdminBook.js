import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminBook = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [editBook, setEditBook] = useState(false);
    const [createBook, setCreateBook] = useState(false)
    const [editBookUUID, setEditBookUUID] = useState('')
    const [bookName, setBookName] = useState('');
    const [bookAuthorName, setBookAuthorName] = useState('')
    const [selfNumber, setselfNumber] = useState('')
    const [genre, setgenre] = useState('')
    const [editSuccess, setEditSuccess] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/books");
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBooks();
    }, [editSuccess, deleteSuccess, createSuccess]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/authors");
                setAuthors(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAuthors();
    }, []);


    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/books/${searchTerm}`);
            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const data = searchTerm.length > 0 ? searchResults : books;

    const handleEditClick = (book) => {
        setEditSuccess(false)
        setEditBook(true)
        setEditBookUUID(book.uuid)
        setBookName(book.bookName);
        setselfNumber(book.selfNumber);
        setgenre(book.genre);
        setBookAuthorName(book.author.name)
    };

    const handleCreateBook = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/addbook', {
                authorName: bookAuthorName,
                bookName: bookName,
                selfNumber: selfNumber,
                genre: genre
            })
            .then((response) => {
                setCreateSuccess(true)
                clearforms()
            })
            .catch((error) => {
                console.error(error);
            });
        setCreateSuccess(false)
    };



    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/book/${editBookUUID}`, {
                authorName: bookAuthorName,
                bookName: bookName,
                selfNumber: selfNumber,
                genre: genre
            })
            .then((response) => {
                const updatedAuthor = response.data;
                setEditSuccess(true)
                clearforms()
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = async (uuid) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            try {
                await axios.delete(`http://localhost:5000/books/${uuid}`);
                setDeleteSuccess(true);
            } catch (error) {
                console.error(error);
            }
            setDeleteSuccess(false);
        }
        console.log(uuid);
    };

    const handleCancel = () => {
        setEditBook(false)
        clearforms()
    };

    const clearforms = () => {
        setBookName("");
        setgenre("");
        setselfNumber("");
        setBookAuthorName("");
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col my-10">
                <h2 className="text-3xl font-semibold mb-4">Books</h2>
                <div className="flex flex-col md:flex-row mb-4">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="px-4 py-2 rounded-md border-2 focus:outline-none"
                            placeholder="Search Books"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                    <div className='px-48'>
                        {
                            editBook ?
                                <div>
                                    <h2 className="text-3xl font-semibold mb-4">Edit Book:</h2>
                                    <form onSubmit={handleEditSubmit} className="px-4 py-8">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-600">Book Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={bookName}
                                                onChange={(e) => setBookName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block mb-2 font-semibold text-gray-600">Genre:</label>
                                            <input
                                                type="text"
                                                id="genre"
                                                value={genre}
                                                onChange={(e) => setgenre(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="age" className="block mb-2 font-semibold text-gray-600">selfNumber:</label>
                                            <input
                                                type="text"
                                                id="selfNumber"
                                                value={selfNumber}
                                                onChange={(e) => setselfNumber(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="authorName" className="block mb-2 font-semibold text-gray-600">
                                                Author Name:
                                            </label>
                                            <select
                                                id="authorName"
                                                value={bookAuthorName}
                                                onChange={(e) => setBookAuthorName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            >
                                                <option value="">Select an author</option>
                                                {authors.map((author) => (
                                                    <option key={author} value={author.name}>
                                                        {author.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                onClick={handleEditSubmit}
                                                className="px-4 py-2 mr-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleCancel()}
                                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                :
                                <div>
                                    <h2 className="text-3xl font-semibold mb-4">Create Book:</h2>
                                    <form onSubmit={handleCreateBook} className="px-4 py-8">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-600">Book Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={bookName}
                                                onChange={(e) => setBookName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block mb-2 font-semibold text-gray-600">Genre:</label>
                                            <input
                                                type="text"
                                                id="genre"
                                                value={genre}
                                                onChange={(e) => setgenre(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="age" className="block mb-2 font-semibold text-gray-600">selfNumber:</label>
                                            <input
                                                type="text"
                                                id="selfNumber"
                                                value={selfNumber}
                                                onChange={(e) => setselfNumber(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="authorName" className="block mb-2 font-semibold text-gray-600">
                                                Author Name:
                                            </label>
                                            <select
                                                id="authorName"
                                                value={bookAuthorName}
                                                onChange={(e) => setBookAuthorName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            >
                                                <option value="">Select an author</option>
                                                {authors.map((author) => (
                                                    <option key={author} value={author.name}>
                                                        {author.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                onClick={handleCreateBook}
                                                className="px-4 py-2 mr-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
                                            >
                                                Create
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleCancel()}
                                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                        }
                    </div>
                </div>
                <div className="table-container py-20">
                    <table className="w-full border-collapse border border-gray-500">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="w-1/4 py-2 border border-gray-500">Book Name</th>
                                <th className="w-1/4 py-2 border border-gray-500">Author</th>
                                <th className="w-1/4 py-2 border border-gray-500">Genre</th>
                                <th className="w-1/4 py-2 border border-gray-500">Self Number</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-scroll">
                            {data.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-4 py-1 w-1/4 border border-gray-500">
                                        <Link to={`/bookDetail/${book.uuid}`}>{book?.bookName}</Link>
                                    </td>
                                    <td className="px-4 py-1 pl-36 w-1/4 border border-gray-500">
                                        <Link to={`/authorDetail/${book.author?.uuid}`}>{book.author?.name}</Link>
                                    </td>
                                    <td className="px-4 py-1 pl-36 w-1/4 border border-gray-500">{book.genre}</td>
                                    <td className="px-4 py-1 pl-36 w-1/4 border border-gray-500">{book.selfNumber}</td>
                                    <td className='px-4 py-4'>
                                        <button
                                            onClick={(e) => {
                                                handleEditClick(book)
                                            }}
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.uuid)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default AdminBook