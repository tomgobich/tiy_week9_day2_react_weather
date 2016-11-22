import React, { Component } from 'react';
import './Day.css';

class Day extends Component {

    getDay() {
        let date = new Date(this.props.forecast.dt * 1000);
        let dayIndex = date.getDay();
        let day;

        switch(dayIndex) {
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tuesday';
                break;
            case 3:
                day = 'Wednesday';
                break;
            case 4:
                day = 'Thursday';
                break;
            case 5:
                day = 'Friday';
                break;
            default:
                day = 'Saturday';
                break;
        }

        return day;
    }

    getIcon() {
        let iconCode = this.props.forecast.weather[0].icon;
        let iconSrc;

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
                    <img className="description-icon" src={'images/' + this.getIcon()} />
                    <p>{this.props.forecast.weather[0].description}</p>
                </div>
                <p className="temp">
                    <span className="temp-max">{Math.round(this.props.forecast.temp.max)}&deg;</span>
                    <span className="temp-min">{Math.round(this.props.forecast.temp.min)}&deg;</span>
                </p>
            </div>
        );
    }
}

export default Day;