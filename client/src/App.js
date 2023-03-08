import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import AuthorDetail from './components/AuthorDetail';
import Admin from './components/Admin';
import AuthorsTable from './components/AuthorsTable'
import ErrorPage from "./components/ErrorPage";
import AdminAuthor from "./components/AdminAuthor";
import AdminBook from "./components/AdminBook";

function App() {
  return (
    <Router>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/author" element={<AdminAuthor />} />
        <Route path="/admin/book" element={<AdminBook />} />
        <Route path="/authorsTable" element={<AuthorsTable />} />
        <Route path="/bookDetail/:uuid" element={<BookDetail />} />
        <Route path="/authorDetail/:uuid" element={<AuthorDetail />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
