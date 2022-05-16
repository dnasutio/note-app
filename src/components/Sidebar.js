import React from "react";

export default function Sidebar(props) {
    // if the important filter is off render all notes, otherwise only render important notes
    const noteElements = !props.importantFilter ?
    props.notes.map(note =>
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                {note.important ? <h4 className="important-mark">!</h4> : ""}
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
                <button
                    className="important-btn"
                    onClick={(event) => props.setImportance(event, note.id)}
                >
                    !
                </button>
            </div>
        </div>
    )
    :
    props.notes.map(note => (
        note.important ?
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                {note.important ? <h4 className="important-mark">!</h4> : ""}
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
                <button
                    className="important-btn"
                    onClick={(event) => props.setImportance(event, note.id)}
                >
                    !
                </button>
            </div>
        </div>
        :
        null
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
                <button className="important-filter" onClick={props.showImportant}>!</button>
            </div>
            {noteElements}
        </section>
    );
}