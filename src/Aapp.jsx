import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Weather from './components/Weather'

function App() {

  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()
  const [temp, settemp] = useState()
  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
setcoords(currentCoords)


  }
  useEffect (() => {
  navigator.geolocation.getCurrentPosition(success);
 }, [])
useEffect(()=> {

if (coords) {
  const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=e06ec2e5380d7fb5f2489f5b75a92d94`
 
  axios
 .get(URL)
 .then((res)=>{
  setweather(res.data)
 const celsius = (res.data.main.temp - 273.15).toFixed(1)
 const fahrenheit = (celsius*(9/5)+32).toFixed(1)
 const newTemps = {
  celsius,
  fahrenheit
 }
settemp (newTemps)
  
})
.catch((err)=>console.log(err)) ;
}
},[coords]);
return (
  <div className="App grid 
  place-content-center min-h-screen bg-[url('./images/bg.jpg')] bg-cover px-2">
      {
        weather ? (
           <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
        )
      }
     
     
    </div>
  );
}

export default App;
