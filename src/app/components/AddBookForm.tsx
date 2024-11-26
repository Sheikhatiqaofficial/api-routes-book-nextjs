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

  const formRef = useRef<HTMLFormElement | null>(null); 

  
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
      [name]: name === 'available' ? value === 'true' : value, 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editBook) {
     
      onEdit(book);
    } else {
     
      onAdd({ ...book, id: Date.now() });  
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
