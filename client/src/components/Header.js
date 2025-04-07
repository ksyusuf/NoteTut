import React from 'react';

const Header = ({ onAddNote }) => (
  <header className="bg-white shadow-md p-4 rounded-xl m-4 mt-10">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">Tüm Notlarım</h1>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
        onClick={onAddNote}
      >
        + Yeni Not Ekle
      </button>
    </div>
  </header>
);

export default Header;
