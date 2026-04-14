import React from 'react';
import { render, screen } from '@testing-library/react';
import Note from './Note.js';

describe('Note Component', () => {
  test('renders note with title and content', () => {
    render(<Note title="Sample Title" content="This is a sample note." />);

    const titleElement = screen.getByText(/sample title/i);
    const contentElement = screen.getByText(/this is a sample note./i);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test('renders note with long title and content', () => {
    const longTitle = 'A'.repeat(100);
    const longContent = 'B'.repeat(1000);

    render(<Note title={longTitle} content={longContent} />);

    const titleElement = screen.getByText(longTitle);
    const contentElement = screen.getByText(longContent);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test('renders note with special characters', () => {
    render(<Note title="Title with !@#$%^&*" content="Content with <tags> & more!" />);

    const titleElement = screen.getByText(/title with !@#\$\%\^\&\*/i);
    const contentElement = screen.getByText(/content with <tags> & more!/i);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  // More tests can be added here as needed
});