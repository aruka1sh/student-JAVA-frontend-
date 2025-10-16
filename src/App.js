import React from 'react';
import './App.css';
import StudentManager from './StudentManager'; // Импортируем наш новый компонент

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Progress Dashboard</h1>
      </header>
      <main className="App-main">
        {/* Вставляем компонент для управления студентами */}
        <StudentManager />
      </main>
    </div>
  );
}

export default App;