import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Home/Navbar';

const Layout = () => {
  const [navList, setNavList] = useState([]);
  useEffect(() => {
    setNavList([
      {
        route: 'register',
        text: 'Register',
      },
      {
        route: '/',
        text: 'Login',
      },
      {
        route: 'home',
        text: 'Home',
      },
      {
        route: 'myTweets',
        text: 'My Tweets',
      },
      {
        route: 'allUsers',
        text: 'Users',
      },
      {
        route: '/',
        text: 'Logout',
      },
    ]);
  }, []);
  return (
    <main className='App'>
      <Navbar navList={navList} />
      <Outlet />
    </main>
  );
};

export default Layout;
