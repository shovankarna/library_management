import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminAuthor = () => {
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [editAuthor, setEditAuthor] = useState(false);
    const [createAuthor, setCreateAuthor] = useState(false)
    const [editAuthorUUID, setEditAuthorUUID] = useState('')
    const [authName, setAuthName] = useState('');
    const [authDob, setAuthDob] = useState('');
    const [authAge, setAuthAge] = useState('');
    const [editSuccess, setEditSuccess] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(false)


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
    }, [editSuccess, deleteSuccess, createSuccess]);

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

    const handleEditClick = (author) => {
        setEditSuccess(false)
        setEditAuthorUUID(author.uuid)
        setEditAuthor(true)
        setAuthName(author.name);
        setAuthDob(author.dob);
        setAuthAge(author.age);
    };

    const handleCreateAuthor = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/addauthors', {
                name: authName,
                dob: authDob,
                age: authAge,
            })
            .then((response) => {
                setCreateSuccess(true)
            })
            .catch((error) => {
                console.error(error);
            });
        setCreateSuccess(false)
    };



    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/author/${editAuthorUUID}`, {
                name: authName,
                dob: authDob,
                age: authAge
            })
            .then((response) => {
                const updatedAuthor = response.data;
                setEditSuccess(true)
                setEditAuthor(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = async (uuid) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            try {
                await axios.delete(`http://localhost:5000/author/${uuid}`);
                setDeleteSuccess(true);
            } catch (error) {
                console.error(error);
            }
            setDeleteSuccess(false);
        }
    };

    const handleCancel = () => {
        setEditAuthor(false)
        clearforms()
    };

    const clearforms = () => {
        setAuthName("");
        setAuthDob("");
        setAuthAge("");
    }

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
                    <div className='px-48'>
                        {
                            editAuthor ?
                                <div>
                                    <h2 className="text-3xl font-semibold mb-4">Edit Author:</h2>
                                    <form onSubmit={handleEditSubmit} className="px-4 py-8">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-600">Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={authName}
                                                onChange={(e) => setAuthName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block mb-2 font-semibold text-gray-600">Date of Birth:</label>
                                            <input
                                                type="date"
                                                id="dob"
                                                value={authDob}
                                                onChange={(e) => setAuthDob(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="age" className="block mb-2 font-semibold text-gray-600">Age:</label>
                                            <input
                                                type="number"
                                                id="age"
                                                value={authAge}
                                                onChange={(e) => setAuthAge(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
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
                                <div className='py-10'>
                                    <h2 className="text-3xl font-semibold mb-4">Create Author:</h2>
                                    <form onSubmit={handleEditSubmit} className="px-4 py-8">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 font-semibold text-gray-600">Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={authName}
                                                onChange={(e) => setAuthName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block mb-2 font-semibold text-gray-600">Date of Birth:</label>
                                            <input
                                                type="date"
                                                id="dob"
                                                value={authDob}
                                                onChange={(e) => setAuthDob(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="age" className="block mb-2 font-semibold text-gray-600">Age:</label>
                                            <input
                                                type="number"
                                                id="age"
                                                value={authAge}
                                                onChange={(e) => setAuthAge(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                onClick={handleCreateAuthor}
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
                <div className="table-container pb-20">
                    <table className="w-full border-collapse border border-gray-500">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="w-1/4 py-2 border border-gray-500">Author Name</th>
                                <th className="w-1/4 py-2 border border-gray-500">Date of Birth</th>
                                <th className="w-1/4 py-2 border border-gray-500">Age</th>
                                {/* <th className="w-1/4 py-2 border border-gray-500">Books</th> */}
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
                                    {/* <td className="px-4 py-1 pl-20 w-1/4 border border-gray-500">
                                        {author.books && author.books.map((book) => (
                                            <tr key={book.id}>
                                                <td className='px-10 border border-gray-500'>
                                                    <Link to={`/bookDetail/${book.uuid}`}>{book.bookName}</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </td> */}
                                    <td className='px-4 py-4'>
                                        <button
                                            onClick={(e) => {
                                                handleEditClick(author)
                                            }}
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(author.uuid)}
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

export default AdminAuthor