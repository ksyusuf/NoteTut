import React, { useState } from 'react';
import NoteCard from './NoteCard';
import CategorySidebar from './CategorySidebar';
import Header from './Header';

const AllNotesPage = ({ notes, categories, onAddNote, onEditNote, onDeleteNote }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // gelen kategori talebine göre kategori filtresi uygula.
  // gelen notları, içerisindeki kategori verisine göre filtreledik.
  // client taraflı filtreleme.
  const filteredNotes = selectedCategory === 'All'
    ? notes
    : notes.filter(note => note.category.name === selectedCategory);

  // Notları tarihine göre azalan sırada sıralama
  // redux değişmezlik kuralından dolayı değişkeni değiştirmeden kopyası ile işlem yapıyoruz.
  const sortedNotes = [...filteredNotes].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <main className="flex-1 flex flex-col">
        <Header onAddNote={onAddNote} />
        <div className="flex flex-col md:flex-row flex-1">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            // seçilmiş kategoriyi tekrardan sidebar'a göndermemizin sebebi
            // seçili olan kategorinin sidebar üzerinde renginin koyulaştırılıp
            // mevcutta hangi kategori sayfasında olduğunun anlaşılması içindir.
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1 mx-4 md:mx-6 md:ml-3 mt-4 overflow-y-auto">
            {sortedNotes.map(note => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onEdit={onEditNote} 
                onDelete={onDeleteNote} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllNotesPage;
