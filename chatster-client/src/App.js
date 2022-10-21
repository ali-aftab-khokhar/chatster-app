import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import ContextState from './context/contextState';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ContextState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/home' element={<Home />} />
          </Routes>
        </Router>
      </ContextState>
    </div>
  );
}

export default App;
