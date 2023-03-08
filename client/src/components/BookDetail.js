import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {

  const [book, setBook] = useState(null);
  const { uuid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/book/${uuid}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{book.bookName}</h2>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Self Number:</span> {book.selfNumber}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Genre:</span> {book.genre}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Author:</span>
          <Link to={`/authorDetail/${book.author?.uuid}`}>{book.author?.name}</Link>
        </p>
      </div>
    </div>
  );
}

export default BookDetail