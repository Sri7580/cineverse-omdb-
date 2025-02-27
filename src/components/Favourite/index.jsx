import Navbar from "../Navbar"
import ReactContext from "../ReactContext"
import './index.css'
import { MdDelete } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import MovieDetails from "../MovieDetails";
import {Link} from 'react-router-dom'

const Favourite  = ()=>(
    <>
    <Navbar />
        <ReactContext.Consumer>
            {value=>{
                const {removeFavourite,favourite,setImdbId}=value
                return(
                    <div className="loadingAndRenderPage">
                        
                        <ul  className="favouritecontainers">
                        {favourite.map(eachVal=>(
                            
                                <li className="favouritecontainer" key={eachVal.imdbID}>
                                    <div className="listOfFavourites">

                                    <img className="favouriteImg" src={eachVal.Poster} alt={eachVal.Title} />
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                    <p className="FavouriteTitle" >{eachVal.Title}</p>
                                    <p className="favouriteMoviefont">{eachVal.Type}</p>
                                    <p className="favouriteMoviefont">{eachVal.Year}</p>
                                    </div>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>

                                        <button className="buttonStyle" onClick={()=>{removeFavourite(eachVal.imdbID)}}><MdDelete /></button>
                                        <Link to='/moviesdetails'><button  className="buttonStyle" onClick={()=>{setImdbId(eachVal.imdbID)}} style={{color:'green !important'}}>More Details</button></Link>

                                    </div>
                                </li>



                            
                        ))}
                        </ul>
                    </div>    
                )
            }}    
        </ReactContext.Consumer>
    </>
)

export default Favourite