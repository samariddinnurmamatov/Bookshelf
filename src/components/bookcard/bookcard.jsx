import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import { Edit } from '@material-ui/icons';
import axios from '../../services/AuthService';
import ModalComponent from '../ui/Modal';

export const statuses = {
  0: "New",
  1: "Reading",
  2: "Finished"
};

const Book = ({ book, deleteBook, editBook }) => { 
  const [hovered, setHovered] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(book?.status || 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isbn, setIsbn] = useState(book?.isbn); 

  const handleDelete = async () => {
    try {
      await deleteBook(book?.id);
      toast.success('Book successfully deleted', {position: "bottom-right",});
    } catch (error) {
      toast.error('Error occurred while deleting the book', {position: "bottom-right",});
    }
  };

  const handleChangeStatus = async (newStatus) => {
    try {
      const statusNum = parseInt(newStatus);
      if (!isNaN(statusNum) && statusNum >= 0 && statusNum <= 2) {
        const sendingData = JSON.stringify({ status: statusNum });
        await axios.patch(`/books/${book.id}`, sendingData);
        setSelectedStatus(statusNum);
        toast.success('Book status successfully updated', {position: "bottom-right",});
      } else {
        console.error('Noto\'g\'ri status raqami:', {position: "bottom-right",}, newStatus);
        toast.error('Error occurred while updating the book status', {position: "bottom-right",});
      }
    } catch (error) {
      console.error('Holatni yangilashda xatolik:', {position: "bottom-right",}, error);
      toast.error('Error occurred while updating the book status', {position: "bottom-right",});
    }
  };

  useEffect(() => {
    setSelectedStatus(book?.status || 0);
  }, [book?.status]);

  return (
    <div className='bg-white border rounded-lg p-6 relative' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div>
        <h1 className='text-[20px] mb-3'>{book?.title || "Kitob nomi"}</h1>
        <div className='text-[15px] text-gray-600'>
          <p>Cover: {book?.cover || <Link className='text-[14px] text-blue-500'>http://url.to.book.cover/</Link>}</p>
          <p>Pages: {book?.pages || <span className='text-[14px]'>221</span>}</p>
          <p>Published: {book?.published || <span className='text-[14px]'>2012</span>}</p>
          <p>ISBN: {book?.isbn || <span className='text-[14px]'>9498988923</span>}</p>
        </div>
        <div className='pt-3 text-gray-600 flex items-center justify-between gap-2'>
          <p>{book?.author || <Link className='text-[14px]'>Eben Upton / 2012</Link>}</p>
          <div className='relative'>
            <button className='bg-red-500 text-white px-3 rounded-lg' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {statuses[selectedStatus]}
            </button>
            <div className='absolute top-full bg-white border rounded-lg p-2 w-[100%]' style={{ display: isDropdownOpen ? 'block' : 'none' }}>
              {Object.entries(statuses).map(([statusKey, statusValue]) => (
                <button key={statusKey} className='block w-full text-left' onClick={() => handleChangeStatus(statusKey)}>
                    {statusValue}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {hovered && (
        <div>
          <button className='absolute top-3 rounded-[4px] p-[2px] right-[-23px] bg-red-500 delete-button' onClick={handleDelete}>
            <DeleteIcon style={{ color: "white" }} />
          </button>
          <button className='absolute top-12 rounded-[4px] p-[2px] right-[-23px] bg-blue-500 delete-button' onClick={() => setIsModalOpen(true)}>
            <Edit style={{ color: "white" }} />
          </button>
        </div>
      )}
      <ModalComponent open={isModalOpen} handleClose={() => setIsModalOpen(false)} createBook={editBook} isbn={isbn} setIsbn={setIsbn} />
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    published: PropTypes.number.isRequired,
    isbn: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
  deleteBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired, // editBook propertiyasini PropTypes ga qo'shing
};

export default Book;
