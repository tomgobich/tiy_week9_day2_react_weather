import React, { Component } from 'react';
import $ from 'jquery';
import Day from './Day';
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

      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleUnitChange = this.handleUnitChange.bind(this);
      this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    }


    // --------------------------------------------------
    // Updates state location variable on input change
    // --------------------------------------------------
    handleLocationChange(event) {
      this.setState({searchLocation: event.target.value});
    }

    // --------------------------------------------------
    // Updates forecast information with new location
    // --------------------------------------------------
    handleLocationSubmit(event) {
      event.preventDefault();

      // Get forecast for new location
      this.getForecast(this.state.temperatureUnit);
    }

    // --------------------------------------------------
    // Toggles temperature unit
    // --------------------------------------------------
    handleUnitChange() {
      // Set defaults
      let unit = 'metric';
      let label = 'Celcius';

      // Currently set as metric?
      if(this.state.temperatureUnit === 'metric') {
        // Yes, change to imperial
        unit = 'imperial';
        label = 'Fahrenheit';
      }

      // Set new unit
      this.setState({temperatureUnit: unit});

      // Update DOM
      $('#unitToggle').toggleClass('active');
      $('#unitLabel').text(label);

      // Get new temperatures
      this.getForecast(unit);
    }



    // --------------------------------------------------
    // Gets forecast from API and updates state variables
    // --------------------------------------------------
    getForecast(unit) {
      let forecastPromise = $.ajax({
        url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.searchLocation}&type=like&units=${unit}&cnt=7&APPID=ebf5e5843530b4f8cf4c0bd17b6b6048`,
      })
      forecastPromise.then((response) => {
        this.setState({
          searchLocation:   response.city.name + ', ' + response.city.country,
          weatherLocation:  response.city.name + ', ' + response.city.country,
          forecast: response.list,
        });
      });
    }



    // Load initial forecast
    componentWillMount()
    {
      this.getForecast(this.state.temperatureUnit);
    }



  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-xs-12 col-md-3 col-lg-2 header">
            <h1 className="logo">React Weather App</h1>

            <div id="unitToggle" className="toggle active" onClick={this.handleUnitChange}>
              <div className="switch"></div>
            </div>
            <label id="unitLabel">Fahrenheit</label>
          </div>

          <div className="col-xs-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 body-content">

            <form className="location-input" onSubmit={this.handleLocationSubmit}>
              <input type="text" value={this.state.searchLocation} onChange={this.handleLocationChange} />
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
