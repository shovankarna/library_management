import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorsTable = () => {

  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);
  console.log(authors);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/authors/${searchTerm}`);
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = searchTerm.length > 0 ? searchResults : authors;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col my-10">
        <h2 className="text-3xl font-semibold mb-4">Authors</h2>
        <div className="flex flex-col md:flex-row mb-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="px-4 py-2 rounded-md border-2 focus:outline-none"
              placeholder="Search Authors"
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
        <div className="table-container pb-20">
          <table className="w-full border-collapse border border-gray-500">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="w-1/4 py-2 border border-gray-500">Author Name</th>
                <th className="w-1/4 py-2 border border-gray-500">Date of Birth</th>
                <th className="w-1/4 py-2 border border-gray-500">Age</th>
                <th className="w-1/4 py-2 border border-gray-500">Books</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {data.map((author) => (
                <tr key={author.id}>
                  <td className="px-4 py-1 w-1/4 border border-gray-500">
                    <Link to={`/authorDetail/${author.uuid}`}>{author.name}</Link>
                  </td>
                  <td className="px-4 py-1 pl-36 w-1/4 border border-gray-500">{author.dob}</td>
                  <td className="px-4 py-1 pl-36 w-1/4 border border-gray-500">{author.age}</td>
                  <td className="px-4 py-1 pl-20 w-1/4 border border-gray-500">
                    {author.books && author.books.map((book) => (
                      <tr key={book.id}>
                        <td className='px-10 border border-gray-500'>
                          <Link to={`/bookDetail/${book.uuid}`}>{book.bookName}</Link>
                        </td>
                      </tr>
                    ))}
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

export default AuthorsTable