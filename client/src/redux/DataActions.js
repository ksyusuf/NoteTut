import { getNotes, addNoteToState, editNoteToState, deleteNoteToState} from './notesReducter';
import { setCategories } from './categoriesReducter';
import axios from 'axios';

// API URL'yi environment variable'dan al veya default değer kullan
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/notes';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchNotesAndCategories = () => async (dispatch) => {
  try {
    const response = await api.get('/');
    const { notes, categories } = response.data;
    dispatch(getNotes(notes));
    dispatch(setCategories(categories));
  } catch (error) {
    console.error('Error fetch notes and categories:', error);
    throw error;
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    // state içerisine eklene notun kategorisi string değil obje olması gerekiyor.
    // api üzerinden dönen notun kategori değeri de bir obje olduğu için bunu state'e ekledik.
    const response = await api.post('/', note);
    dispatch(addNoteToState(response.data));
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export const editNote = (gelen_not) => async (dispatch) => {
  try {
    const response = await api.patch(`/${gelen_not._id}`, gelen_not);
    dispatch(editNoteToState(response.data));
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = (note) => async (dispatch) => {
  try {
    await api.delete(`/${note._id}`);
    // sunucu tarafından bir hata olmadığı sürece state için id gönderebiliriz.
    dispatch(deleteNoteToState(note._id));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};