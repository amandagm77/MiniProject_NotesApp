import React from 'react';
import { render, screen } from '@testing-library/react';
import NoteList from './NoteList.js';

describe('NoteList Component', () => {
  test('renders empty note list without errors', () => {
    render(<NoteList notes={[]} />);
    
    // Assert that no notes are rendered
    const notes = screen.queryAllByRole('listitem');
    expect(notes.length).toBe(0);
  });

  test('renders a list of notes', () => {
    const sampleNotes = [
      { title: 'Note 1', content: 'Content 1' },
      { title: 'Note 2', content: 'Content 2' },
    ];
    
    render(<NoteList notes={sampleNotes} />);
    
    // Assert that notes are rendered correctly
    const noteTitles = sampleNotes.map(note => screen.getByText(note.title));
    const noteContents = sampleNotes.map(note => screen.getByText(note.content));

    noteTitles.forEach(title => expect(title).toBeInTheDocument());
    noteContents.forEach(content => expect(content).toBeInTheDocument());
  });

  test('renders notes with special characters', () => {
    const specialNotes = [
      { title: 'Special !@#$', content: 'Content with <tags> & more!' },
    ];
    
    render(<NoteList notes={specialNotes} />);
    
    const noteTitle = screen.getByText(/special !@#\$/i);
    const noteContent = screen.getByText(/content with <tags> & more!/i);

    expect(noteTitle).toBeInTheDocument();
    expect(noteContent).toBeInTheDocument();
  });

  // Additional tests can be added here
});
