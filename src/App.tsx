import React from 'react';
import './styles/App.css';
import UsersManagment from './components/UsersManagment'

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h2>
        Users Managment
      </h2>
      <div>
        <UsersManagment />
      </div>
        
    </header>
    
  </div>
  );
}

export default App;
