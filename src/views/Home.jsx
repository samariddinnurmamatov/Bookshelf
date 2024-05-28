import { useState, useEffect } from 'react';
import axios from '../services/AuthService';
import ModalComponent from '../components/ui/Modal';
import Book from '../components/bookcard/bookcard';
import Spinner from '../components/ui/Spinner';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/books');
      setBooks(response.data?.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsbn('');
  };

  const createBook = (newBook) => {
    setBooks((prevBooks) => [newBook, ...prevBooks]);
    handleClose();
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.book?.id !== bookId));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="py-10">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="text-white">
              <h1 className="text-[30px] mb-2">
                You’ve got <span style={{ color: "#6200EE" }}>{books.length} book</span>
              </h1>
              <p>Your books today</p>
            </div>
            <div>
              <button className="text-white px-4 py-2 rounded-lg" style={{ background: "#6200EE" }} onClick={handleOpen}>+ Create a book</button>
            </div>
          </div>
          <div className="py-10 grid grid-cols-3 gap-7">
            {books.map((book) => (
              <Book key={book.book?.id} book={book.book} deleteBook={deleteBook} />
            ))}
          </div>
          <ModalComponent open={open} handleClose={handleClose} createBook={createBook} isbn={isbn} setIsbn={setIsbn} />
        </>
      )}
    </div>
  );
};

export default Home;
