import PropTypes from 'prop-types';
import React from 'react';
import Note from './Note';

function NoteList({ notes }) {
    return (
        <div>
            {notes.map((note, index) => (
                <Note key={index} title={note.title} content={note.content} />
            ))}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NoteList;
