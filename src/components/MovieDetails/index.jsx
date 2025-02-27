import { Component } from "react"
import Navbar from "../Navbar";
import './index.css'
import { MdPlaylistAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ThreeDots } from 'react-loader-spinner';

const apiStatuses = {
    INITIAL: "INITIAL",
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
};

class MovieDetails extends Component{
    state = {fetchedData:{},apiStatus:apiStatuses.INITIAL}

    componentDidMount() {
        this.fetchMovies();
      }
    
      renderFailureView = () => (
        <div>
            <h1>Failed to fetch movie details</h1>
            <button onClick={this.fetchMovies}>Retry</button>
        </div>
    );

      fetchMovies = async () => {
        this.setState({apiStatus: apiStatuses.IN_PROGRESS });
        const {imdbId} = this.props
        const movieDetailsUrls =  `https://www.omdbapi.com/?i=${imdbId}&apikey=c21e15c5`
    
        try {
          const movieDetailsResponse = await fetch(movieDetailsUrls)
        
    
          if (!movieDetailsResponse.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const moviesDetailJson = await movieDetailsResponse.json();
          console.log(moviesDetailJson)
          const movieDetailsData = moviesDetailJson || {};
    
          this.setState({
            apiStatus: apiStatuses.SUCCESS,
            fetchedData: movieDetailsData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          this.setState({ apiStatus: apiStatuses.FAILURE });
        }
      };

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

    renderMovieDetails = ()=>{
        const {fetchedData} = this.state
        const {addFavourites,removeFavourite,favourite,imdbId}=this.props
        console.log(imdbId)
        return (
            <div className="movie-details-container">
                
                <div>
                <h1 className="movietitle"><strong>Title:</strong> {fetchedData.Title}</h1>
                <img src={fetchedData.Poster} alt={fetchedData.Title} className="movie-poster" />
                <p><strong>Year:</strong> {fetchedData.Year}</p>
                </div>
                <div>
                <div className="movieDetailsButton">
                {favourite.find(findVal=>findVal.imdbID===imdbId)?<button className="moredetails buttonflex" onClick={()=>{removeFavourite(imdbId)}} style={{outline:'none'}}>Remove<span className="spanItem"><MdDelete/></span></button>:<button className="addToFavouriteInMoviedetails" onClick={()=>{addFavourites({Title:fetchedData.Title,Year:fetchedData.Year,Poster:fetchedData.Poster,Type:fetchedData.Type,imdbID:imdbId})}}>Add To favourite<span className="spanItem"><MdPlaylistAdd /></span></button>}
                </div>
                <div className="detailsOfMovies">
            
                <p><strong>Director:</strong> {fetchedData.Director}</p>
                <p><strong>Actors:</strong> {fetchedData.Actors}</p>
                <p><strong>Genre:</strong> {fetchedData.Genre}</p>
                <p><strong>Plot:</strong> {fetchedData.Plot}</p>
                <p><strong>Language:</strong> {fetchedData.Language}</p>
                <p><strong>Country:</strong> {fetchedData.Country}</p>
                <p><strong>Released:</strong> {fetchedData.Released}</p>
                <p><strong>Runtime:</strong> {fetchedData.Runtime}</p>
                <p><strong>Rated:</strong> {fetchedData.Rated}</p>
                <p><strong>Box Office:</strong> {fetchedData.BoxOffice}</p>
                <p><strong>Metascore:</strong> {fetchedData.Metascore}</p>
                <p><strong>IMDB Rating:</strong> {fetchedData.imdbRating}</p>
                <p><strong>Awards:</strong> {fetchedData.Awards}</p>
                <h3>Ratings:</h3>
                <ul className="lists">
                
                {fetchedData.Ratings?.map((rating, index) => (
                        <li className="ratings" key={index}><strong>{rating.Source}</strong>: {rating.Value} </li>
                        
                    ))}
                    
                </ul>
                </div>
                </div>
            </div>
        );
    }

    renderContent = ()=>{
        const {apiStatus} = this.state 
        switch(apiStatus){
            case apiStatuses.IN_PROGRESS:
                return this.renderLoadingView()
            case apiStatuses.SUCCESS:
                return this.renderMovieDetails()
            case apiStatuses.FAILURE:
                return this.renderFailureView();
            default:
                return null
        }
    }
    render(){
        const {fetchedData} = this.state
        console.log(fetchedData)
        return(
            <div className="homePage">
                <Navbar />
                <div className="loadingAndRenderPage">
                    {this.renderContent()}
                </div>

            </div>
        )
    }
    
}
export default MovieDetails