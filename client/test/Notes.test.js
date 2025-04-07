import React from 'react';
import CategorySidebar from '../src/components/CategorySidebar';
import NoteCard from '../src/components/NoteCard';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Redux ile ilgili mock'lar
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn()
  }));
  
  jest.mock('../src/redux/DataActions', () => ({
    deleteNote: jest.fn()
  }));
// bu şekilde axios isteği yapan fonksiyonu mockledir. susturduk.

// Mock notlar ve kategoriler
const mockCategories = [
{ _id: "dff23t5yASD", name: 'work' },
{ _id: "2A32cy4356v", name: 'personal' },
];

const mockNotes = [
  { _id: "1v54ASDv5fu6SDy", header: 'Test Note 1', content: 'Content 1', category: mockCategories[0] },
  { _id: "2c4tre232C43ASe", header: 'Test Note 2', content: 'Content 2', category: mockCategories[1] },
];


describe('AllNotesPage Rendering Test', () => {
  test('kategoriler görüntüleniyor mu?', () => {
    render(
          <CategorySidebar
            categories={mockCategories} 
            selectedCategory={mockCategories[0].name} 
            onSelectCategory={() => {}} 
          />
      );

    const noteCards = screen.getByText('Kategoriler');
    expect(noteCards).toBeInTheDocument()
  });

  test("NoteCard'lar görüntüleniyor mu?", () => {
    render(
          <NoteCard 
            key={mockNotes[0]._id} 
            note={mockNotes[0]} 
            onEdit={() => {}} 
            onDelete={() => {}}
          />
      );

    // Tüm NoteCard'ları bul
    const noteCards = screen.getAllByTestId(/note-card-/);
    expect(noteCards).toHaveLength(1);
  });

  test("Spesifik NoteCard görüntüleniyor mu?", () => {
    render(
          <NoteCard 
            key={mockNotes[0]._id} 
            note={mockNotes[0]} 
            onEdit={() => {}} 
            onDelete={() => {}}
          />
      );

    // Spesifik bir NoteCard'ı kontrol et
    expect(screen.getByTestId('note-card-'+mockNotes[0]._id)).toHaveTextContent('Test Note 1');
  });

});