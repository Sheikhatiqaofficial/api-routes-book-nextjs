// // page.tsx
// "use client"; // Add this line

// import { useState } from 'react';
// import AddBookForm from './components/AddBookForm';
// import BooksList from './components/BooksList';

// const BookPage = () => {
//   const [books, setBooks] = useState([
//     { id: 1, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling' },
//     { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
//     { id: 3, title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling' },
//     { id: 4, title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling' },
//     { id: 5, title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling' },
//     { id: 6, title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling' },
//     { id: 7, title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling' },
//   ]);

//   const handleAddBook = (newBook: { title: string; author: string }) => {
//     setBooks((prevBooks) => [
//       ...prevBooks,
//       { id: prevBooks.length + 1, title: newBook.title, author: newBook.author },
//     ]);
//   };

//   const handleEditBook = (updatedBook: { id: number; title: string; author: string }) => {
//     setBooks((prevBooks) =>
//       prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
//     );
//   };

//   const handleDeleteBook = (id: number) => {
//     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Book List</h1>
//       <AddBookForm onAdd={handleAddBook} />
//       <BooksList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
//     </div>
//   );
// };

"use client"; 

import { useState } from 'react';
import AddBookForm from './components/AddBookForm';
import BooksList from './components/BooksList';
import Header from './components/Header';
import Footer from './components/Footer';

const BookPage = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", year: 1997, genre: "Fantasy", language: "English", available: true },
    { id: 2, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", year: 1998, genre: "Fantasy", language: "English", available: true },
    { id: 3, title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", year: 1999, genre: "Fantasy", language: "English", available: true },
    { id: 4, title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", year: 2000, genre: "Fantasy", language: "English", available: true },
    { id: 5, title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling", year: 2003, genre: "Fantasy", language: "English", available: true },
    { id: 6, title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", year: 2005, genre: "Fantasy", language: "English", available: true },
    { id: 7, title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling", year: 2007, genre: "Fantasy", language: "English", available: true },
  ]);

  const [editBook, setEditBook] = useState<null | { id: number; title: string; author: string; year: number; genre: string; language: string; available: boolean }>(null);

  const handleAddBook = (newBook: { title: string; author: string; year: number; genre: string; language: string; available: boolean }) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { id: prevBooks.length + 1, ...newBook },
    ]);
  };

  const handleEditBook = (updatedBook: { id: number; title: string; author: string; year: number; genre: string; language: string; available: boolean }) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditBook(null);  // Clear the edit state after updating
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Header/>
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <AddBookForm onAdd={handleAddBook} onEdit={handleEditBook} editBook={editBook} />
      <BooksList books={books} onEdit={(book) => setEditBook(book)} onDelete={handleDeleteBook} />
        <Footer/>
    </div>
  );
};

export default BookPage;
