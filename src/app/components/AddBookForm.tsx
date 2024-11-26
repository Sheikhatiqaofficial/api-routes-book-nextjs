
// import React, { useState } from 'react';

// interface AddBookFormProps {
//   setBooks: React.Dispatch<React.SetStateAction<any[]>>;
// }

// const AddBookForm: React.FC<AddBookFormProps> = ({ setBooks }) => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [year, setYear] = useState('');
//   const [genre, setGenre] = useState('');
//   const [language, setLanguage] = useState('');
//   const [available, setAvailable] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newBook = {
//       title,
//       author,
//       year: parseInt(year),
//       genre,
//       language,
//       available,
//     };

//     const response = await fetch('/api/books', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newBook),
//     });

//     if (response.ok) {
//       const addedBook = await response.json();
//       setBooks((prevBooks) => [...prevBooks, addedBook]); // Add new book to state
//       setTitle('');
//       setAuthor('');
//       setYear('');
//       setGenre('');
//       setLanguage('');
//       setAvailable(false);
//     } else {
//       console.error('Failed to add book');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full px-4 py-2 border rounded-md"
//         required
//       />
//       <input
//         type="text"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Author"
//         className="w-full px-4 py-2 border rounded-md"
//         required
//       />
//       <input
//         type="number"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//         placeholder="Year"
//         className="w-full px-4 py-2 border rounded-md"
//         required
//       />
//       <input
//         type="text"
//         value={genre}
//         onChange={(e) => setGenre(e.target.value)}
//         placeholder="Genre"
//         className="w-full px-4 py-2 border rounded-md"
//         required
//       />
//       <input
//         type="text"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         placeholder="Language"
//         className="w-full px-4 py-2 border rounded-md"
//         required
//       />
//       <label className="flex items-center">
//         <input
//           type="checkbox"
//           checked={available}
//           onChange={(e) => setAvailable(e.target.checked)}
//         />
//         <span className="ml-2">Available</span>
//       </label>
//       <button
//         type="submit"
//         className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Book
//       </button>
//     </form>
//   );
// };

// export default AddBookForm;

import React, { useState, useEffect, useRef } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  language: string;
  available: boolean;
}

interface AddBookFormProps {
  onAdd: (newBook: Book) => void;
  onEdit: (updatedBook: Book) => void;
  editBook: Book | null;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd, onEdit, editBook }) => {
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    year: 2020,
    genre: '',
    language: '',
    available: true,
  });

  const formRef = useRef<HTMLFormElement | null>(null); // Ref for the form to scroll into view

  // Populate form if editing a book
  useEffect(() => {
    if (editBook) {
      setBook(editBook);
      // Scroll to the form when it's being edited
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [editBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: name === 'available' ? value === 'true' : value, // Handle boolean toggle
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editBook) {
      // Update the existing book
      onEdit(book);
    } else {
      // Add a new book
      onAdd({ ...book, id: Date.now() });  // Generate a unique ID using Date.now()
    }
    setBook({
      id: 0,
      title: '',
      author: '',
      year: 2020,
      genre: '',
      language: '',
      available: true,
    });  // Reset form after submission
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Title"
        className="mb-2 p-2"
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Author"
        className="mb-2 p-2"
      />
      <input
        type="number"
        name="year"
        value={book.year}
        onChange={handleChange}
        placeholder="Year"
        className="mb-2 p-2"
      />
      <input
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleChange}
        placeholder="Genre"
        className="mb-2 p-2"
      />
      <input
        type="text"
        name="language"
        value={book.language}
        onChange={handleChange}
        placeholder="Language"
        className="mb-2 p-2"
      />
      <label className="mr-2">
        Available
        <input
          type="checkbox"
          name="available"
          checked={book.available}
          onChange={() => setBook((prevBook) => ({ ...prevBook, available: !prevBook.available }))}
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2">
        {editBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default AddBookForm;
