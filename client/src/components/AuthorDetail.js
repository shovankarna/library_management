import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AuthorDetail = () => {
  const [author, setAuthor] = useState({});
  const { uuid } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/author/${uuid}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uuid]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='p-10'>
        <h2 className='text-2xl font-bold'>Author Detail</h2>
        <p><strong>Name:</strong> {author.name}</p>
        <p><strong>Date of Birth:</strong> {author.dob}</p>
        <p><strong>Age:</strong> {author.age}</p>
      </div>
      <div className='p-10'>
        <h2 className='text-2xl font-bold'>Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Self Number</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {author.books && author.books.map((book) => (
              <tr key={book.id}>
                <td className='px-10'>
                  <Link to={`/bookDetail/${book.uuid}`}>{book.bookName}</Link>
                </td>
                <td className='px-10'>{book.selfNumber}</td>
                <td className='px-10'>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuthorDetail