## Project Title
Weather Dashboard

## Project Description

Weather Dashboard – A responsive web application that allows users to search for weather by city and view:

Current conditions (temperature, weather description, icon).

5-day forecast (temperature trends, conditions).

## Audience:
Anyone who wants a simple, easy-to-use weather checker (students, commuters, travelers).
Why it matters: Weather is part of daily decision-making from choosing outfits to planning travel. This app makes it fast and simple.

## Tech Stack

Languages: JavaScript, HTML, CSS

Frontend Framework: React + Vite

Styling: Bootstrap 5 (for responsive layouts and pre-styled components)

API: OpenWeatherMap API

Testing: Jest + React Testing Library

Version Control: Git + GitHub

AI Tools: Cursor (in-editor assistance) 
CodeRabbit (PR reviews)
ChatGPT (documentation/test generation)

AI Integration Strategy
1. Code Generation

Use AI in Cursor to scaffold React components like:

<WeatherCard /> → displays city, temperature, condition, icon.

<SearchBar /> → input field + button to search city.

<Dashboard /> → integrates components and API.

Generate fetch functions (getCurrentWeather, getForecast) directly from OpenWeatherMap API schema.

Ask AI to generate chart logic for forecast visualization.

2. Testing

Use AI prompts to scaffold unit and integration tests in Jest:

Unit test: API functions return correct data or handle 404 errors.

Component test: WeatherCard renders correctly with props.

Integration test: Dashboard triggers search → fetch → render flow.

Extend coverage with AI prompts like:
“Generate tests for empty input or failed API response in Dashboard.”

3. Documentation

Use AI to generate:

Inline comments in functions (/** Fetch weather for a given city */).

Docstrings for fetch utilities.

Polished README.md (this one) and update instructions when features change.

4. Context-Aware Techniques

Provide AI with API schema (OpenWeatherMap endpoints & example responses) when generating fetch utilities.

Use file tree snapshots in AI prompts to maintain correct imports/exports.

Paste git diffs into AI prompts for commit message generation.

Leverage PR review tooling (CodeRabbit/Cursor) to analyze code context and suggest improvements.

## How to Run

Clone repo:

git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard


Install dependencies:

npm install

Add your OpenWeatherMap API key in .env:

VITE_WEATHER_API_KEY=your_api_key_here


Start dev server:
npm run dev

Run tests:
npm test