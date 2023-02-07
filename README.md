![Build](https://github.com/isahohieku/weather-app/actions/workflows/pr.yaml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/492d27f3-b1f9-4ef0-a4b4-6c242dc95a5e/deploy-status)](https://app.netlify.com/sites/admiring-mestorf-8f350d/deploys)
[![codecov](https://codecov.io/gh/isahohieku/weather-app/branch/main/graph/badge.svg?token=C9WCMBNFFC)](https://codecov.io/gh/isahohieku/weather-app)

# Simple Weather App

## This is a simple weather app.

[Link to deployed App](admiring-mestorf-8f350d.netlify.app/)

## Approach

- Outlined the user story so as to understand the feature requirements and how to implement them. Attached is a Word File in the root of the project repo. [Epic - Weather App](https://github.com/isahohieku/weather-app/blob/main/Epic%20-%20Weather%20App.docx)
- Created a little mockup on Figma based on the user story. The `.fig` file can also be found in the root folder [Figma design](https://github.com/isahohieku/weather-app/blob/main/Weather%20App.fig)
- Approched implementation of the code with TDD and Atomic design.

## Expectations

- [x] Display the weather at random geographic coordinates
- [ ] ~~A form with city and country that fetches and displays the weather in this city~~ A search input field a user can add any city/country of choice to search it's weather.
- [x] optional: cache the fetched weather data
- [x] Gracefully handle the case where the city could not be found (display the information to the user)

## Installation

After cloning the project, run `yarn install` in the terminal to install dependencies (Assuming you're in the root directory of the project in the terminal).

## Setting up environment

Create a `.env` in the root folder of the project, copy and past content of `.envsample` file in the root folder to the `.env` file.

If you have no API key from OpenWeather, click [OpenWeather](https://openweathermap.org/) to signup and get one.

## Run Application

Run `yarn start` in the terminal to start the application

## Test Application

Run `yarn test` in the terminal to run test on the application.
Use `yarn test:coverage` for test coverage.

## Lint Project

Run `yarn lint` in the terminal to lint project and get report.
Use `yarn lint:fix` to fix all fixable lint issues.

## Make Project Pretty

Run `yarn prettier:check` in the terminal to get report.
Use `yarn prettier:fix` to fix all fixable issues.
