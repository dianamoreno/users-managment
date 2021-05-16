import React from 'react';
import './App.css';
import UsersManagment from './components/UsersManagment'

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>
        Users Managment
      </h1>
      <div>
        <UsersManagment />
      </div>
        
    </header>
    
  </div>
  );
}

export default App;
