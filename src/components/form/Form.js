import React from 'react';
import './Form.css';

const API_KEY = "cb69e1b7054af1f80f919bc4e4cacf4e";
const GEO_API_KEY = "66118be2d204be";





export default class Form extends React.Component{
constructor(props) {
  super(props)
  this.state = {
    city: '',
    country:'',
    error:''
  }
}
//get the value from the input fields
onchange = (event) => {
    this.setState({[event.target.name]: event.target.value})
   // console.log(this.state)
}

//geo locate and look up co-ordinates
getLocation =  async(e)=> {
  e.preventDefault();
  let city = this.state.city
  let country = this.state.country

  const geo_api_call = await fetch(`http://locationiq.com/v1/search.php?key=${GEO_API_KEY}&q=${city},${country}&format=json`)
  const data = await geo_api_call.json();

  let latitude;
  let longitude;
  let cityName;

  if (data.length === 0){
    this.state.error = "Enter a valid location"
    console.log(this.state.error)
  }
  else if(data.length >= 1){
    latitude  = data[0].lat
    longitude  = data[0].lon
    cityName = data[0].display_name

  } else {
    latitude  = data.lat
    longitude  = data.lon
    cityName = data.display_name    
  } 

  console.log(data)
  console.log(cityName)


const weather_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)//make the api call
const weather_data = await weather_api_call.json();

this.props.history.push({
  pathname: '/weather',
  state: {
  data:weather_data,
  city:cityName
   
  }
});

//console.log(geo_api_call)

}
  onchange(event){
    this.setState({
      [event.target.name]:event.target.value  
    })
    console.log(this.state)
   }
  render() {
    return (
      <div className="Form">
        <h1 className="form-title">Where on earth are you?</h1>
          <form onSubmit ={this.getWeather}>
            <div className = "input-container">
              <input type="text" id="city" name="city" placeholder="street/city/country" onChange={this.onchange}/>
            </div>
           
              <button onClick={this.getLocation}>Get the weather</button>

          </form>
          <p>{this.state.error}</p>
      </div>
    );
  }
}

  





