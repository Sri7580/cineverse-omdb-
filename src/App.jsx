import { Route, Routes } from "react-router-dom";
import CineVerse from "./components/CineVerse";
import { Component } from "react";
import MovieDetails from "./components/MovieDetails";
import ReactContext from "./components/ReactContext";
import Favourite from './components/Favourite';
import Movies from "./components/Movies";
import Series from "./components/Series";
import Cookies from 'js-cookie';

const apiStatus = {
  initial: "INITIAL",
  inprogress: "INPROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbId: '',
      fetchedData: [],
      search: "",
      page: 2,
      apiStatus: apiStatus.initial,
      type: "movie",
      favourite: App.getFavouriteFromCookies(),
    };
  }

  static getFavouriteFromCookies() {
    const favData = Cookies.get("favourite");
    return favData ? JSON.parse(favData) : []; 
  }

  setImdbId = (id) => {
    this.setState({ imdbId: id });
  };

  updateFavouriteCookies = (favourites) => {
    Cookies.set("favourite", JSON.stringify(favourites), { expires: 7 });
  };

  addFavourites = (value) => {
    this.setState((prevState) => {
      const updatedFavourites = [...prevState.favourite, value];
      this.updateFavouriteCookies(updatedFavourites);
      return { favourite: updatedFavourites };
    });
  };

  removeFavourite = (id) => {
    this.setState((prevState) => {
      const updatedFavourites = prevState.favourite.filter(eachVal => eachVal.imdbID !== id);
      this.updateFavouriteCookies(updatedFavourites);
      return { favourite: updatedFavourites };
    });
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    this.setState({ apiStatus: apiStatus.inprogress });

    const { page } = this.state;
    const Movieurl = `https://www.omdbapi.com/?s=the a&page=${page}&type=movie&apikey=c21e15c5`;
    const SeriesUrl = `https://www.omdbapi.com/?s=hell&page=${page}&type=series&apikey=c21e15c5`;

    try {
      const [moviesResponse, seriesResponse] = await Promise.all([
        fetch(Movieurl),
        fetch(SeriesUrl),
      ]);

      if (!moviesResponse.ok || !seriesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const moviesJson = await moviesResponse.json();
      const seriesJson = await seriesResponse.json();

      const movies = moviesJson.Search || [];
      const series = seriesJson.Search || [];
      this.setState({
        apiStatus: apiStatus.SUCCESS,
        fetchedData: [movies, series],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ apiStatus: apiStatus.FAILURE });
    }
  };

  render() {
    const { imdbId, fetchedData, favourite } = this.state;
    return (
      <ReactContext.Provider value={{ 
        fetchedData, 
        apiStatus: this.state.apiStatus, 
        addFavourites: this.addFavourites, 
        favourite, 
        imdbId, 
        setImdbId: this.setImdbId, 
        removeFavourite: this.removeFavourite 
      }}>
        <Routes>
          <Route exact path="/" element={<CineVerse />} />
          <Route exact path="/moviesdetails" element={<MovieDetails imdbId={imdbId} favourite={favourite} addFavourites={this.addFavourites} removeFavourite={this.removeFavourite} />} />
          <Route exact path="/favourite" element={<Favourite />} />
          <Route exact path="/movies" element={<Movies favourite={favourite} fetchedData={fetchedData[0]} setImdbId={this.setImdbId} addFavourites={this.addFavourites} removeFavourite={this.removeFavourite} />} />
          <Route exact path="/series" element={<Series favourite={favourite} fetchedData={fetchedData[1]} setImdbId={this.setImdbId} addFavourites={this.addFavourites} removeFavourite={this.removeFavourite} />} />
        </Routes>
      </ReactContext.Provider>
    );
  }
}

export default App;
