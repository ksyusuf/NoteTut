import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

const notesReducer = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNoteToState: (state, action) => {
      state.notes.push(action.payload);
    },
    editNoteToState: (state, action) => {
      // add işleminden farklıdır.
      const updatedNote = action.payload;
      state.notes = state.notes.map(note => note._id === updatedNote._id ? updatedNote : note);
    },
    deleteNoteToState: (state, action) => {
      // state içindeki iligli notu filtreler.
      // ilgili not silindiği için server tarafından response olarak not değil mesaj döner.
      // sileceğim notun id'sini aldım. bir hata almadığım durumda buraya o değer gelecek.
      // action.payload silinen notun id değeridir.
      state.notes = state.notes.filter(note => note._id !== action.payload);
    }
  },
});

export const { getNotes, addNoteToState, editNoteToState, deleteNoteToState } = notesReducer.actions;
export default notesReducer.reducer;
