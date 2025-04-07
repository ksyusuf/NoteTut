import React, { useState, useEffect } from 'react';
import AllNotesPage from './components/AllNotesPage';
import NewNotePage from './components/NewNotePage';
import EditNotePage from './components/EditNotePage';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchNotesAndCategories } from './redux/DataActions';

const App = () => {

  const [page, setPage] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentNote, setCurrentNote] = useState(null);
  const { notes, categories } = useSelector(state => ({
    notes: state.notes.notes,
    categories: state.categories.categories,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchNotesAndCategories());
      } catch (error) {
        console.error('Failed to load notes and categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleAddNoteClick = () => {
    setPage('new');
    setCurrentNote(null);
  };

  const handleEditNoteClick = (note) => {
    setCurrentNote(note);
    // düzenleme sayfası açıldığı zaman ilgil ikutucuklara ilgili değerleri yerleştirir.
    setPage('edit');
  };

  const handleSaveNote = async () => {
    setPage('all');
  };

  const handleUpdateNote = async () => {
    setPage('all');
  };

  const handleDeleteNote = async () => {
    setPage('all');
  };

  // tüm kategorileri id değerleri ile çekmiştik, şimdi alfabetik sıralayıp öyle paylaşıyoruz
  // redux değişmezlik kuralından dolayı değişkeni değiştirmeden kopyası ile işlem yapıyoruz.
  const Allcategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : page === 'all' ? (
        <AllNotesPage 
          notes={notes}
          categories={Allcategories}
          onAddNote={handleAddNoteClick} 
          onEditNote={handleEditNoteClick} 
          onDeleteNote={handleDeleteNote} 
        />
      ) : page === 'new' ? (
        <NewNotePage onSave={handleSaveNote} categories={Allcategories} />
      ) : page === 'edit' && currentNote ? (
        <EditNotePage note={currentNote} onUpdate={handleUpdateNote} categories={Allcategories} />
      ) : null}
    </div>
  );
};

export default App;
