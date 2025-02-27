import {Component} from 'react'
import React from "react";
import ReactCarousels from '../ReactCarousels'
import Navbar from '../Navbar'
import { ThreeDots } from 'react-loader-spinner';
import ReactContext from '../ReactContext'
import './index.css'

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


const CineVerse = ()=>(

    <ReactContext.Consumer>
        {value=>{
            const {removeFavourite,apiStatus,favourite,fetchedData,setImdbId,addFavourites} = value
            const checkapiStatus = apiStatus!=="SUCCESS"
            return(
                <div className='homePage'>
                    <Navbar />
                    <div className='loadingAndRenderPage'>
 
                    
                    {
                        checkapiStatus?(
                        <div className="loaderclass"><ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="green"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            /></div>):(
    
                                    <>
                                    <h1 style={{margin:'0px',width:'20px',fontSize:'25px',marginBottom:'10px',color:'green'}} >Movies</h1>
                                    <ReactCarousels list={fetchedData[0]} addFavourites = {addFavourites} tab='movies' setImdbId={setImdbId} favourite={favourite} removeFavourite={removeFavourite} />
                                    <h1 style={{margin:'0px',width:'20px',fontSize:'25px',marginBottom:'10px',color:'green'}}>Series</h1>
                                    <ReactCarousels list={fetchedData[1]} addFavourites = {addFavourites} tab='series' setImdbId={setImdbId} favourite={favourite} removeFavourite={removeFavourite} />
                                    </>


                            )
                    }
                    </div>
                </div>

            )
        }}
    </ReactContext.Consumer>

)


export default CineVerse