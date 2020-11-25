# Mutual Fund Analysis Dashboard
## Angular Dashboard to visualize personalized Mutual Fund data

## Problem Statement
Over the years, investors have tried and tested various methodologies to keep a track of all investements.
The various problems faced for the same are -

1. Multi-vendor - The Mutual Funds are invested via multiple vendors, like Groww, Paytm Money, etc., hence no unified interface to track all investments.
2. The historic data is not accurately predicted - Over time the historic data loses importance and is overriden to be fitted only in Time Series Graph.
3. Periodic Tracking of data - Everyday net change in the invested amount.
4. Personalized Prediction - Currently all Mutual Fund Predictions are not personalized, only based on overall NAV chnages.

## API for both current and predicted data - 
The APIs for both current and predicted data are fetched from a Flask App, hosted with Heroku.
Link to the codebase - https://github.com/apratimnath/mutual-fund-analysis

## Data Visualization Framework - 
Highcharts and Highcharts-angular
Link to their website - https://www.highcharts.com/demo

## Deployment Methodology -
The app is created and deployed in the following way
1. The angular app is prod-built into the dist folder.
2. An outer Node Server is created at the root level.
3. The node server fetches the app from built dist and server the contents.
4. The node application is deployed onto Heroku.

## Dashboards and structure
### To be updated soon!
