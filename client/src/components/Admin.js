import React from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  return (
    <div className='p-12'>
      <h1 className='text-3xl font-bold pb-10'>Admin Panel</h1>

      <h2 className='text-xl font-bold'>Authors</h2>
      <button
        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => navigate("/admin/author")}>
        Authors
      </button>

      <h2 className='text-xl font-bold'>Books</h2>
      <button
        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => navigate("/admin/book")}>
        Books
      </button>

    </div>
  )
}

export default Admin