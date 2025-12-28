import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssignmentList from './components/AssignmentList';
import AssignmentAttempt from './components/AssignmentAttempt';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <h1>CipherSQLStudio</h1>
          <p>Master SQL with intelligent hints.</p>
        </header>
        <main className="app__main">
          <Routes>
            <Route path="/" element={<AssignmentList />} />
            <Route path="/assignment/:id" element={<AssignmentAttempt />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
