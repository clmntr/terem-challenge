// ------------------------------
// Imports

import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './weatherData.css';

// ------------------------------
// Component

export default class WeatherData extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            years : []
        }
    }

    componentDidMount() {
        fetch('/api/weatherData')
            .then( response => response.json() )
            .then( data => this.setState({
                years : data.WeatherData
            }))
        ;
    }


    // TODO : Split into components

    render() {
        return (
            <div className="weather-data">
                <div className="weather-data__average">
                    <h2>Average daily Rainfall</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart  height={300} data={this.state.years} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="AverageDailyRainfall" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="Year" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="weather-data__total">
                    <h2>Total Rainfall</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart  data={this.state.years} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="TotalRainfall" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="Year" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}
