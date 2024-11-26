import React from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  language: string;
  available: boolean;
}

interface BooksListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
}

const BooksList: React.FC<BooksListProps> = ({ books, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="border p-4 mb-2 rounded-lg shadow-md hover:bg-gray-200 hover:scale-105 transform transition-all duration-300"
        >
          <h3 className="font-bold">{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.year}</p>
          <p>{book.genre}</p>
          <p>{book.language}</p>
          <p>{book.available ? 'Available' : 'Not Available'}</p>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => onEdit(book)}
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
