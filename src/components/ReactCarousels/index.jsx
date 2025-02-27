import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IoCloseSharp } from "react-icons/io5";
import './index.css'
import { MdPlaylistAdd } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

var settings = {
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 2,
  };


const ReactCarousels = (props)=>{
    const {removeFavourite,favourite,list,tab,setImdbId,addFavourites} = props
    
return(
        <Slider {...settings}>
            {
                list.map(eachVal=>(
                    <Popup
                        key={eachVal.imdbID}
                        modal
                        trigger={
                            <button className="triggerbutton">
                                <div className="carouselcard">
                                    <img className="carouselImage" src={eachVal.Poster} />
                                    <h1 className="title">{eachVal.Title}</h1>
                                </div>
                            </button>
                        }
                    >
                        {close=>(
                            <div className="popup">
                                <button className="closeImage" onClick={()=>(close())}><IoCloseSharp/></button>
                                <div className="movieMiniDetails">
                                    <img className="movieMiniDetailsImage" src={eachVal.Poster} />
                                    <div className="miniDetails">
                                    <h1 className="miniDetailsTitle" style={{fontSize:'20px'}}>Title: <span className="miniDetailsTitleName">{eachVal.Title}</span></h1>
                                    <h1 className="miniDetailsTitle" style={{fontSize:'20px'}}>Type: <span className="miniDetailsTitleName">{eachVal.Type}</span></h1>
                                    <h1 className="miniDetailsTitle" style={{fontSize:'20px'}}>Year: <span className="miniDetailsTitleName">{eachVal.Year}</span></h1>
                                    <div className="miniDetailsButton">
                                    {favourite.find(findVal=>findVal.imdbID===eachVal.imdbID)?<button className="buttonflex" onClick={()=>{removeFavourite(eachVal.imdbID)}} style={{outline:'none'}}>Remove from playlist<span className="spanItem"><MdDelete/></span></button>:<button className="addToFavourite" onClick={()=>{addFavourites(eachVal)}}>Add To favourite<span className="spanItem"><MdPlaylistAdd /></span></button>}
                                    <Link to='/moviesdetails'><button onClick={()=>{setImdbId(eachVal.imdbID)}} style={{outline:'none'}}>More Details<span className="spanItem"><IoMdArrowDropdown/></span></button></Link>
                                    
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        )}
                    </Popup>
                ))
                
            }
            <div className="carouselcard ">
            <Link to={`/${tab}`}>
            <button className="seeallButton" style={{backgroundColor:'transparent',border:'none'}}>See all</button>
            </Link>
            </div>
        </Slider>)

}
export default ReactCarousels