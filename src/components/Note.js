import PropTypes from 'prop-types';
import React from 'react';

function Note({ title, content }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

Note.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Note;
