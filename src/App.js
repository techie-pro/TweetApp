import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import './App.css';
import Register from './components/Home/Register';
import AllUsers from './components/AllUsers';
import MyTweets from './components/MyTweets';
import ForgotPassword from './components/Home/ForgotPassword';
import Login from './components/Home/Login';
import Missing from './components/Missing';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          {/* private routes */}
          <Route path='/' element={<RequireAuth />}>
            <Route path='home' element={<HomePage />} />
            <Route path='allUsers' element={<AllUsers />} />
            <Route path='myTweets' element={<MyTweets />} />
          </Route>

          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
