

'use client';

import React, { useState } from 'react';

type Books= {
  id: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
  language: string;  // Corrected 'Language' to 'language'
  genre: string;  // Corrected 'Genre' to 'genre'
}
type EditBookFormProps = {
  book: Books;  // single book object
  onClose: () => void;  // function to close the form
  onUpdate: (book: Books) => void;  // function to update the book
};

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Books>(book); // Initialize form with current book data

  const handleSubmit = () => {
    onUpdate(formData); // Pass updated book data to onUpdate
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
      />
      {/* other form fields */}
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Close</button>
    </form>
  );
};

export default EditBookForm;