import React from 'react';
import Navbar from './components/Navbar';
import { Route ,Routes , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
<<<<<<< HEAD
=======
import AllRooms from './pages/AllRooms';
>>>>>>> 5449bcb (Reconnect to GitHub)


const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      { !isOwnerPath && <Navbar/>} 
      <div className='min-h-[70vh]'>
          <Routes>
             <Route path='/' element = { <Home/> } />,
<<<<<<< HEAD

=======
             <Route path='/rooms' element = { <AllRooms /> } />,
             
>>>>>>> 5449bcb (Reconnect to GitHub)
          </Routes> 
      </div>
      <Footer/>
    </div>
  )
};

export default App;