# Basic Weather App

This is a basic weather app built using the React library. It utilizes Google Maps APIs to get the latitude and longitude for a user search, using the Map Place Search API. Finally, a weather API returns the weather data.

## Features

- User can search for a location.
- App retrieves latitude and longitude using Google Maps APIs.
- Weather data is fetched and displayed using a weather API.

## Prerequisites

- Node.js and npm installed.
- Google Maps API key.
- Weather API key.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
2. Install the dependencies:
`npm install`
3. Install the dependencies:
    Create a `.env` file in the root directory and add your API keys:

  `REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    REACT_APP_WEATHER_API_KEY=your_weather_api_key`


## Usage

1. Start the development server: 
`npm start`
2. Open your browser and go to `http://localhost:3000`.
3. Enter a location in the search bar to get the weather data.

## Technologies Used

1. React
2. Google Maps APIs
3. Place Search API
4. Weather API