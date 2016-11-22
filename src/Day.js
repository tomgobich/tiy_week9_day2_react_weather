import React, { Component } from 'react';
import './Day.css';

class Day extends Component {

    // --------------------------------------------------
    // Gets day text using datetime from API
    // --------------------------------------------------
    getDay() {
        let date = new Date(this.props.forecast.dt * 1000);
        let dayIndex = date.getDay();
        let day;

        // Change dayIndex into day text
        switch(dayIndex) {
            case 0:
                day = 'SUN';
                break;
            case 1:
                day = 'MON';
                break;
            case 2:
                day = 'TUE';
                break;
            case 3:
                day = 'WED';
                break;
            case 4:
                day = 'THU';
                break;
            case 5:
                day = 'FRI';
                break;
            default:
                day = 'SAT';
                break;
        }

        return day;
    }



    // --------------------------------------------------
    // Gets icon using iconCode from API
    // --------------------------------------------------
    getIcon() {
        let iconCode = this.props.forecast.weather[0].icon;
        let iconSrc;

        // Set image file based off iconCode
        switch(iconCode)
        {
            case '01d':
                iconSrc = 'sunny.svg';
                break;
            case '01n':
                iconSrc = 'moon.svg';
                break;
            case '02d':
                iconSrc = 'cloud-few.svg';
                break;
            case '02n':
                iconSrc = 'cloud-few-night.svg';
                break;
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                iconSrc = 'cloud-scattered.svg';
                break;
            case '09d':
                iconSrc = 'rainy.svg';
                break;
            case '09n':
                iconSrc = 'rainy-night.svg';
                break;
            case '10d':
            case '10n':
                iconSrc = 'rain.svg';
                break;
            case '11d':
            case '11n':
                iconSrc = 'storm.svg';
                break;
            case '13d':
            case '13n':
                iconSrc = 'snowflake.svg';
                break;
            case '50d':
            case '50n':
                iconSrc = 'raindrop.svg';
                break;
            default:
                iconSrc = `http://openweathermap.org/img/w/${iconCode}.png`;
                break;
        }

        return iconSrc;
    }

    render() {
        return (
            <div className="forecast-day">
                <p className="day">{this.getDay()}</p>
                <div className="description">
                    <img className="description-icon" src={'images/' + this.getIcon()} alt={this.props.forecast.weather[0].description} />
                    <p>{this.props.forecast.weather[0].description}</p>
                </div>
                <p className="temp">
                    <span className="temp-max">
                        <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                        {Math.round(this.props.forecast.temp.max)}&deg;
                    </span>
                    <span className="temp-min">
                        <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                        {Math.round(this.props.forecast.temp.min)}&deg;
                    </span>
                </p>
            </div>
        );
    }
}

export default Day;