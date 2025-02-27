import {Link} from 'react-router-dom'
import "./index.css";
import ReactContext from '../ReactContext';

const Navbar = () => (
  <ReactContext.Consumer>
    {value=>{
      const {favourite} = value
      const length = favourite.length
      return(
        <nav className="navbar">
          <h1 className="navbar-logo">🎬 CineVerse</h1>
          <ul className="navbar-links">
           <Link to="/"> <li>Home</li></Link>
           <Link to="/movies"> <li>Movies</li></Link>
           <Link to="/series"> <li>Series</li> </Link>
           <Link to="/favourite"> <li>Favorites <span className='spanElement'>{length}</span></li></Link>
          </ul>
        </nav>
      );
    }}
  
  </ReactContext.Consumer>
);

export default Navbar;
