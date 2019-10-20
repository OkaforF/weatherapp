import React from 'react';
import './Weather.css';
import Moment from 'react-moment';




export default class Weather extends React.Component{
  render(){
    const data = this.props.location.state.data.list.slice(0,5);
    const cityName = this.props.location.state.city;
    console.log(cityName)
    console.log(data)

    // console.log(data)
    return (
      <div className="Weather">
      <h1>{cityName}</h1>
      <main className="weather-container">
      {
        data.map((weatherDay, index) =>{

          return <div className ="weather-cards" key={index}>
          <div className="date-container">
          <p className = "day"><Moment format='ddd'>{weatherDay.dt * 1000 }</Moment></p>
          <p className = "date"><Moment format='  MMM Do YYYY'>{weatherDay.dt * 1000}</Moment></p>
        </div>
          
      
      <div className="icons" ><img src ={`http://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@2x.png`} ></img></div>
      <h2 className="temp-h2">{Math.floor(weatherDay.main.temp)}°<span class="c">C</span></h2>

      <p>{weatherDay.weather[0].main}</p>   
      <p className = "time"><Moment format='HH:mm'>{weatherDay.dt * 1000}</Moment></p>

      
               
    
          </div>
        })
      }

 
   


     
      </main>
      </div>
    );
  }

}

    
