import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        addNewEmptyNote: (state, action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action)=>{
            state.active = action.payload;
        },
        setNotes: (state, action)=>{
            state.notes = action.payload
        },
        setSaving: (state)=>{

        },
        updateNote: (state, action)=>{

        },
        deleteNoteById: (state, action)=>{

        },
        savingNewNote: (state)=>{
            state.isSaving = true;
        }
    }
});



export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote
} = journalSlice.actions;