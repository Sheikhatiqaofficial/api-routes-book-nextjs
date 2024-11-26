'use client';

import React, { useState } from 'react';

type Books= {
  id: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
  language: string;  
  genre: string;  
}
type EditBookFormProps = {
  book: Books;  
  onClose: () => void;  
  onUpdate: (book: Books) => void;  
};

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Books>(book); 

  const handleSubmit = () => {
    onUpdate(formData); 
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
     
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Close</button>
    </form>
  );
};

export default EditBookForm;