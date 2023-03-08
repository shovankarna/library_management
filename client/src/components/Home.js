import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
                </div>
                <div className="table-container">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default Home