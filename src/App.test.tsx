// src/App.test.tsx

// Add this line to make the file a module
export {}

// Your existing test code
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App  children={""}/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
