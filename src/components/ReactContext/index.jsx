import React from 'react'

const ReactContext = React.createContext({
    fetchedData:[],
    apiStatus:'',
    favourite:[],
    addFavourites:()=>{},
    removeFavourite:()=>{},
    imbdId:'',
    setImdbId:()=>{}
})

export default ReactContext