// src/components/ThemedCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

function ThemedCard({ children, className = '', ...rest }) {
  const { darkMode } = useTheme();
  const themeClass = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';

  return (
    <Card className={`shadow-lg border-0 rounded-4 ${themeClass} ${className}`} {...rest}>
      {children}
    </Card>
  );
}

export default ThemedCard;
