import React, { useState, useEffect } from 'react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Kategori menüsü açıkken body scroll'unu engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Component unmount olduğunda scroll'u tekrar aktif et
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // X ikonu komponenti
  const CloseIcon = () => (
    <svg 
    className="w-6 h-6" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>

  );

  // Aşağı ok ikonu komponenti
  const ChevronDownIcon = () => (
    <svg 
    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>

  );

  const handleHeaderClick = (e, action) => {
    e.stopPropagation(); // Event bubbling'i engelle
    if (action === 'reset') {
      onSelectCategory('All');
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="px-4 md:pl-6 md:pr-3 mt-4 md:mt-4 w-full md:w-64">
      {/* Mobil görünüm için başlık ve toggle butonu */}
      <div 
        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg cursor-pointer md:hidden"
        onClick={(e) => handleHeaderClick(e, 'toggle')}
      >
        <h2 className="text-xl font-bold text-gray-800">
          {selectedCategory === 'All' ? 'Kategoriler' : selectedCategory}
        </h2>
        <div 
          onClick={(e) => handleHeaderClick(e, selectedCategory === 'All' ? 'toggle' : 'reset')}
          className="cursor-pointer"
        >
          {selectedCategory === 'All' ? <ChevronDownIcon /> : <CloseIcon />}
        </div>
      </div>

      {/* Overlay - Kategori menüsü açıkken arka planı karart */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Kategori listesi - Masaüstünde görünür */}
      <aside className={`
        bg-white p-6 border-r border-gray-300 shadow-lg rounded-xl
        md:block
        ${isOpen ? 'block' : 'hidden'}
        fixed md:static
        left-4 right-4 md:left-auto md:right-auto
        top-[calc(4rem+32px)] md:top-auto
        z-50
        max-h-[calc(100vh-8rem)] md:max-h-none
        overflow-y-auto
        mt-2 md:mt-0
        transition-all duration-300
      `}>
        {/* Masaüstü görünümü için başlık ve ikon */}
        <div className="hidden md:flex md:justify-between md:items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
          Kategoriler
          </h2>
          
        </div>
        
        <ul key="kategoriler" className="space-y-2">
          <li
            className={`cursor-pointer px-3 py-2 rounded-md text-gray-900 font-bold hover:bg-gray-100 transition duration-200 font-semibold ${selectedCategory === 'All' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              onSelectCategory('All');
              setIsOpen(false);
            }}
          >
            Tümü
          </li>
          {categories.map(category => (
            <li
              key={category._id}
              className={`cursor-pointer px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200 ${selectedCategory === category.name ? 'bg-gray-100 font-semibold text-gray-900' : ''}`}
              onClick={() => {
                onSelectCategory(category.name);
                setIsOpen(false);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default CategorySidebar;
