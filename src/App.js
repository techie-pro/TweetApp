import Navbar from './components/Navbar';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
