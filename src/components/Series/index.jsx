import { Component } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { CgDanger } from "react-icons/cg";
import { BiCameraMovie } from "react-icons/bi";

import { ThreeDots } from "react-loader-spinner";
import './index.css'

const apiStatuses = {
    initial: "INITIAL",
    IN_PROGRESS: "INPROGRESS",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",

  };

class Series extends Component{
    state={search:'',movieList:this.props.fetchedData,apiStatus:apiStatuses.SUCCESS,showNoResult:false}

    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search) {
          this.fetchMovies();
        }
      }

    onSearch=(event)=>{
        const searchVal = event.target.value
        this.setState({search:searchVal,showNoResult:false})
    }

    renderContent = ()=>{
        const {apiStatus} = this.state 
        switch(apiStatus){
            case apiStatuses.IN_PROGRESS:
                return this.renderLoadingView()
            case apiStatuses.SUCCESS:
                return this.renderMovie()
            default:
                return this.renderMovie()
        }
    }

    renderMovie = ()=>{
        const {search,movieList,showNoResult} = this.state
            const {setImdbId,addFavourites,removeFavourite,favourite} = this.props
        return(
        <>
        
                    <ul  className="favouritecontainers">
                    {showNoResult && 
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'70vh',width:'100vw'}}>
                        <p style={{color:'rgb(150, 147, 147)',fontSize:'20px'}}> No Series Found <BiCameraMovie style={{fontSize:'20px'}} /> </p>
                    
                    </div>
                }
                                            {movieList.map(eachVal=>(
                                                
                                                    <li className="movieslistcontainer" key={eachVal.imdbID}>
                                                        <div className="listOfmoviess">
                    
                                                        <img className="movieImg" src={eachVal.Poster} alt={eachVal.Title} />
                                                      
                                                        <p className="movieTitle" >{eachVal.Title}</p>
                                                        
                                                        
                                                        </div>
                                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'250px'}}>
                    
                                                            {favourite.find(findVal=>findVal.imdbID===eachVal.imdbID)?<button className="moredetails buttonflex" onClick={()=>{removeFavourite(eachVal.imdbID)}} style={{outline:'none'}}>Remove<span className="spanItem"><MdDelete/></span></button>:<button className="addToFavouriteInMovie" onClick={()=>{addFavourites(eachVal)}}>Add To favourite<span className="spanItem"><MdPlaylistAdd /></span></button>}
                                                            <Link to='/moviesdetails'><button className="moredetails" onClick={()=>{setImdbId(eachVal.imdbID)}} style={{outline:'none'}}>More Details<span className="spanItem"><IoMdArrowDropdown/></span></button></Link>
                    
                                                        </div>
                                                    </li>
                    
                    
                    
                                                
                                            ))}
                                            </ul>
        </>

    )
}

    renderLoadingView = ()=>(
            <div className="loaderclass"><ThreeDots
                                        visible={true}
                                        height="80"
                                        width="80"
                                        color="green"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        /></div>
        )

    fetchMovies = async ()=>{    
        this.setState({apiStatus:apiStatuses.IN_PROGRESS})
        const {search} = this.state
        const url=`https://www.omdbapi.com/?s=${search}&type=series&apikey=c21e15c5`
    
        const fetchResponse = await fetch(url)
        const jsonData = await fetchResponse.json()
        console.log(jsonData)
        if(jsonData.Response==="False"){
            if(search===""){
                this.setState({apiStatus:apiStatuses.FAILURE,movieList:this.props.fetchedData,showNoResult:false})
            }else{
                this.setState({apiStatus:apiStatuses.FAILURE,movieList:[],showNoResult:true})
            }
            
        }else{
            this.setState({apiStatus:apiStatuses.SUCCESS,movieList:jsonData.Search,showNoResult:false})
        }

        
    }
    render(){
            const {search} = this.state
           
        return(
            <div className="homePage">
                <Navbar />
                <div className="inputAndSearch">
                    <div className="inputSection">
                        <input placeholder="type to search series " type="search" onChange={this.onSearch} value={search} className="searchMoviesAndSeries" />
                        <CiSearch />
                    </div>
                    
                </div>
                <div className="loadingAndRenderPageMovie">
                    {this.renderContent()}
                </div>

            </div>
        )
    
}
}

export default Series