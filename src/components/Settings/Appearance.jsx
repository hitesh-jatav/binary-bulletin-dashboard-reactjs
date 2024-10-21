import React, { useState } from 'react';

const Card = ({ theme, title, text, buttonText, isActive, onClick }) => {
  const cardStyles = {
    width: '18rem',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    border: isActive ? '2px solid red' : theme === 'dark' ? '1px solid #444' : '1px solid #ddd',
  };

  const bodyStyles = {
    backgroundColor: theme === 'dark' ? '#444' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
  };

  const buttonStyles = {
    backgroundColor: theme === 'dark' ? '#007bff' : '#007bff',
    color: '#fff',
    borderColor: theme === 'dark' ? '#007bff' : '#007bff',
  };

  return (
    <div className="card mx-5" style={cardStyles}>
      <div className="card-body" style={bodyStyles}>
        <h5 className="card-title bold">{title}</h5>
        <p className="card-text">{text}</p>
        <a
          href="#"
          className="btn btn-primary"
          style={buttonStyles}
          onClick={onClick}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

const Appearance = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Card
        theme="light"
        title="Bright and Fresh"
        text="Experience clarity and brightness with our light-themed card. It’s designed to bring a sense of freshness and simplicity, perfect for clear and concise communication. Dive into the light and enjoy a more vibrant interface."
        buttonText="Go Light"
        isActive={currentTheme === 'light'}
        onClick={toggleTheme}
      />
      <Card
        theme="dark"
        title="Mysterious and Bold"
        text="Embrace sophistication with our dark-themed card. The elegant dark mode provides a sleek, modern look that’s easy on the eyes and perfect for nighttime use. Explore the depths of style and contrast in a truly immersive experience."
        buttonText="Go Dark"
        isActive={currentTheme === 'dark'}
        onClick={toggleTheme}
      />
    </div>
  );
};

export default Appearance;
