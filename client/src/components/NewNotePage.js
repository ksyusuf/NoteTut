import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/DataActions';

const NewNotePage = ({ onSave, categories }) => {
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (header && content && category) {
      const now = new Date().toISOString();
      dispatch(addNote({ header, content, category, date: now }));
      onSave();
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Yeni Not Ekle</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Başlık"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <textarea
          placeholder="İçerik"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg p-3 mb-6 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Seçilen Kategori</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 w-full"
          onClick={handleSave}
        >
          Yeni Not Ekle
        </button>
      </div>
    </div>
  );
};

export default NewNotePage;
