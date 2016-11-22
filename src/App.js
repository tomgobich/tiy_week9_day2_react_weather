import React, { Component } from 'react';
import $ from 'jquery';
import Day from './Day';
import logo from './logo.svg';
import './App.css';



class App extends Component {



    constructor(props)
    {
      super(props);

      this.state = {
        searchLocation:   'Cincinnati',
        weatherLocation:  'Cincinnati',
        temperatureUnit:  'imperial',
        forecast: [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleUnitChange = this.handleUnitChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(event) {
      this.setState({searchLocation: event.target.value});
    }

    handleUnitChange(event) {
      if(this.state.temperatureUnit == 'metric') {
        $(event.target).prop('checked');
        this.setState({temperatureUnit: 'imperial'});
      }
      else {
        $(event.target).prop('');
        this.setState({temperatureUnit: 'metric'});
      }

      this.getForecast();
    }

    handleSubmit(event) {
      event.preventDefault();

      this.getForecast();
    }



    getForecast() {
      let forecastPromise = $.ajax({
        url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.searchLocation}&type=like&units=${this.state.temperatureUnit}&cnt=7&APPID=ebf5e5843530b4f8cf4c0bd17b6b6048`,
      })
      forecastPromise.then((response) => {
      this.setState({
        searchLocation:   response.city.name + ', ' + response.city.country,
        weatherLocation:  response.city.name + ', ' + response.city.country,
        forecast: response.list,
      });

      console.log(this.state.forecast)
      })
    }



  componentWillMount()
  {
    this.getForecast();
  }



  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-2 header">
            <h1 className="logo">React Weather App</h1>
            <label className="switch">
              <input type="checkbox" onChange={this.handleUnitChange} />
              <div className="slider round"></div>
            </label>
            <label>Fahrenheit</label>
          </div>

          <div className="col-xs-12 col-md-10 offset-md-2 body-content">

            <form className="location-input" onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.searchLocation} onChange={this.handleChange} />
            </form>

            <div className="forecast-list">
              {this.state.forecast.map((day, index) =>
                  <Day key={index} forecast={day} />
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
