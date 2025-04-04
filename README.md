
# CryptoWeatherNexus

CryptoWeatherNexus is a modern, multi-page dashboard that integrates real-time weather data, cryptocurrency information, and news updates. This application provides users with a comprehensive overview of current weather conditions in major cities, live cryptocurrency prices, and the latest news headlines.





## Table of Contents

Features

Setup and Installation

Usage

Design Decisions

API Integrations

Real-Time Data Handling

State Management

Responsive UI

Contributing


## Features

Dashboard Overview: A centralized hub displaying:​


Weather Section: Current temperature, humidity, and conditions for major cities.​

Cryptocurrency Section: Live prices, 24-hour changes, and market capitalization for selected cryptocurrencies.​

News Section: Top cryptocurrency-related headlines.​

Detail Pages:

City Details: Historical weather data with charts and tables.​


Cryptocurrency Details: Historical pricing and extended metrics.​

Real-Time Updates:

Live cryptocurrency price updates via WebSocket.​

Simulated real-time weather alerts.​

State Management: Utilizes Redux for global state management, including user preferences and fetched data.​

Responsive Design: Optimized for devices ranging from mobile screens to large desktops using Tailwind CSS.


## Set up and Installation

Install my-project with npm

```bash
  git clone https://github.com/yourusername/cryptoweathernexus.git
 
  cd cryptoweathernexus

  npm install 
```
Create a .env.local file in the root directory and add the following:


```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coincap_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```
Replace your_openweathermap_api_key, your_coincap_api_key, and your_newsdata_api_key with your respective API keys.

```bash
Run the Development Server:
npm run dev
```

Access the Application
```bash

Open http://localhost:3000 in your browser to view the application
```
    
## Usage/Examples

Dashboard: Upon launching the application, the dashboard provides an overview of weather conditions, cryptocurrency prices, and news headlines.​

Navigation: Use the navigation links to access detailed pages for specific cities or cryptocurrencies.​

Real-Time Updates: Stay informed with live cryptocurrency price updates and simulated weather alerts.


## Design Decisions

Multi-Page Architecture: Enhances user experience by organizing content into dedicated pages for dashboard overview, city details, and cryptocurrency details.​

API Integrations: Selected reputable APIs to ensure accurate and up-to-date information:​

Weather Data: OpenWeatherMap's One Call API 3.0 provides comprehensive weather data. ​


Cryptocurrency Data: CoinCap API offers real-time cryptocurrency information. ​

News Headlines: NewsData.io supplies the latest news articles. ​


Real-Time Data Handling: Implemented WebSocket connections for live cryptocurrency price updates and simulated in-app WebSocket events for weather alerts.​

State Management: Utilized Redux to manage global state, ensuring consistency and facilitating user preference storage.​

Responsive UI: Employed Tailwind CSS to create a responsive design that adapts seamlessly across various devices.
## API Reference



OpenWeatherMap: Provides current weather data, forecasts, and historical data. ​


CoinCap: Offers real-time cryptocurrency prices, market data, and WebSocket support for live updates. ​

NewsData.io: Delivers news articles from a wide range of sources, including filtering options for specific topics. 

Real-Time Data Handling
Cryptocurrency Updates: Established a WebSocket connection with CoinCap to receive live price updates for selected cryptocurrencies. ​
CoinCap API 2.0

Weather Alerts: Simulated real-time weather alerts by dispatching in-app WebSocket events to mimic actual weather notifications.​

State Management
Redux: Implemented Redux to manage global state, including user preferences (e.g., favorite cities and cryptocurrencies) and all fetched data. This ensures a consistent and predictable state across the application.​

Responsive UI
Tailwind CSS: Utilized Tailwind CSS to design a responsive and cohesive user interface. The design ensures optimal viewing and interaction experiences across a wide range of devices, from mobile phones to large desktop monitors.


## Contributing



Contributions are welcome! Please follow these steps:

Fork the Repository: Click the 'Fork' button at the top right of the repository page.

