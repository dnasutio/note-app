import { React, useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import {nanoid} from "nanoid";

export default function App() {
    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    );
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    );
    // state used to switch from displaying all notes and just important notes
    const [importantFilter, setImportantFilter] = useState(false);
    
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes]);
    
    const [curr, setCurr] = useState(0);
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: `${curr}# Type your markdown note's title here`,
            important: false
        }
        setCurr(prev => prev + 1);
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    // this function triggers when important filter is on
    function showImportant() {
        setImportantFilter(prev => !prev);
    }
    
    function updateNote(text) {
        // Put the most recently-modified note at the top
        setNotes(oldNotes => {
            const newArray = []
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text });
                } else {
                    newArray.push(oldNote);
                }
            }
            return newArray;
        });
    }
    
    function deleteNote(event, noteId) {
        event.stopPropagation();
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
        setCurr(prev => prev - 1);
    }

    // flips the importance of a note when the "!" button on the note is clicked
    // TODO: produdces bug, fix it
    function setImportance(event, noteId) {
        event.stopPropagation();
        setNotes(oldNotes => oldNotes.map(note => {
            if (note.id === noteId)
                return !note.important;
            return note;
        }));
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
          notes.length > 0 
          ?
          <Split 
              sizes={[30, 70]} 
              direction="horizontal" 
              className="split"
          >
              <Sidebar
                  notes={notes}
                  currentNote={findCurrentNote()}
                  showImportant={showImportant}
                  importantFilter={importantFilter}
                  setCurrentNoteId={setCurrentNoteId}
                  newNote={createNewNote}
                  deleteNote={deleteNote}
                  setImportance={setImportance}
              />
              {
                  currentNoteId && 
                  notes.length > 0 &&
                  <Editor 
                      currentNote={findCurrentNote()} 
                      updateNote={updateNote} 
                  />
              }
          </Split>
          :
          <div className="no-notes">
              <h1>You have no notes</h1>
              <button 
                  className="first-note" 
                  onClick={createNewNote}
              >
                  Create one now
              </button>
          </div> 
        }
        </main>
    );
}