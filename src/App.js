import Navbar from './components/Navbar';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
// import Register from './components/Register';
import FormValues from './components/FormValues';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<FormValues />}></Route>
        {/* <Route path='/values' element={<FormValues />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
