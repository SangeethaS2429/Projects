
import Home from './Home.jsx'
import Card from './Card.jsx'

import { BrowserRouter, Routes, Route, Link, Form, NavLink } from 'react-router-dom';

function App(){
  return(
    
  <BrowserRouter>
  <nav id = "nav_links" className="lnk">
  <NavLink
  className={({ isActive }) => isActive ? "active" : ""}
  to="/">
  Home
</NavLink>

<NavLink
  className={({ isActive }) => isActive ? "active" : ""}
  to="/posts">
  Posts
</NavLink>
  </nav>

  
  <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/posts' element={<Card />}></Route>
    <Route path="/posts/Add" element={<Card />} />
    <Route path="/posts/:id/edit" element={<Card />} />
  </Routes>
  
  </BrowserRouter>);
}


export default App