
# climaX: The Modern Movie Search Engine
#### Check out the live site  [🚀](https://movie-nine-livid.vercel.app/)

**climaX** is a modern, interactive web application built with **ReactJS** that functions as a powerful movie search engine. It utilizes data from the TMDB (The Movie Database) API and features a live "Trending" section, which tracks and displays the most-searched movies in real time using Appwrite's online cloud database. Users can search for specific movies, discovering details such as rating, year of release, and language—all in a sleek, contemporary interface.

## Features

- **Search Any Movie**: Enter a movie title in the search bar for instant results from TMDB.
- **Detailed Movie Info**: View each movie's rating, release year, and language.
- **Trending Movies**: Dynamically shows movies currently popular with users based on actual search frequency, updated via Appwrite.
- **Appwrite Cloud Integration**: Tracks and aggregates every search, enabling a live trending chart.
- **Modern, Interactive UI**: Built in ReactJS with a focus on responsive design and user engagement.


## How It Works

### 1. Movie Data from TMDB

climaX uses the [TMDB API](https://www.themoviedb.org/documentation/api) to fetch:

- Movie titles
- Poster images
- Ratings
- Year of release
- Original language

An API token is stored securely in environment variables and never exposed in the codebase.

### 2. Intelligent Search with Trending

Each search triggers both:

- An API call to TMDB for fresh movie data.
- An update to Appwrite's cloud database, incrementing that movie's search count.

The **Trending** section is powered by querying Appwrite for the most searched movies, reflecting real user interest rather than static “popularity” lists.

### 3. Appwrite Cloud Backend

- Records every searched movie with a count, using Appwrite's database service.
- Exposes an API for fetching the most popular (most searched) entries.
- Ensures trending data remains current and app-specific.


### 4. Modern UI \& ReactJS Architecture

- Built entirely with ReactJS functional components and hooks for state and effect management.
- Dedicated components for the search bar, movie cards, trending carousel/list, and messaging (errors, loading).
- CSS modules ensure responsive layout and a visually engaging experience.
- Handles errors and loading states gracefully for optimal user experience.


## Getting Started

### Prerequisites

- **React.js** 
- **npm** or **yarn**
- **Appwrite account** (cloud setup required)
- **TMDB API key** (register for a developer token)


### Installation

```bash
git clone https://github.com/yourusername/climax.git
cd climax
npm install
```


### Environment Setup

Create a `.env` file in your project root with:

```env
VITE_API_KEY=YOUR_TMDB_BEARER_TOKEN
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=YOUR_APPWRITE_PROJECT_ID
```

*Refer to Appwrite docs for configuring your database with a collection for movie search counts.*

### Running Locally

```bash
npm run dev
```

Open your browser at `http://localhost:5173` (or the port noted in your terminal).

## Project Structure

```
/src
  /components
    MovieCard.jsx       // Renders movie posters & details
    Search.jsx          // Search bar, input, and logic
  App.jsx               // Main component: state, API calls, trending logic
  appwrite.js           // Appwrite interaction logic (increment/search counts)
  index.css
  App.css
.env
```


## Component Overview

- **App.jsx**: Core logic for state and interaction; orchestrates data fetching and rendering.
- **appwrite.js**: Contains functions to update and fetch movie trending data from Appwrite.
- **MovieCard.jsx**: Visually presents movie data.
- **Search.jsx**: Handles debounced search; manages user input and triggers data updates.


## Security \& Best Practices

- **Environment variables** hold secrets such as API keys—never hardcode them.
- All network requests use secure HTTPS.
- Graceful error handling provides user feedback for API or connectivity issues.
- Follows React best practices for performance and maintainability.


## Contributing

Contributions are welcome! Please fork the repository and open issues or pull requests for features and fixes.

## License

Licensed under the **MIT License**. See the `LICENSE` file for details.

**Experience movies reimagined with climaX—where your searches drive what’s trending!**

<div style="text-align: center">⁂</div>

[^1]: App.jsx

