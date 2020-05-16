# Lets Meet There

The live site is at https://lets-meet-there.netlify.app/

Lets Meet There is a flight searching app. Starting from two locations and particular dates, it allows you to find locations where you could meet up based on the available flights.

The app is created in React with Redux and runs using the skyscanner Api (through rapidapi.com)

A demo of the app can be found at https://youtu.be/zdKWPUNMw30

<u>SETUP</u>

Create a rapidapi.com account and subscribe to the skyscanner api https://rapidapi.com/skyscanner/api/skyscanner-flight-search

This will give you an API key (see screenshot below)

![image-20200422090013551](./readme_img/image-20200422090013551.png)

Now create an .env file in the client directory .

![image-20200422090250556](./readme_img/image-20200422090250556.png)

Adapt the example.env file to a .env in the same location, putting your api key in the REACT_APP_API_KEY as a string.

> REACT_APP_API_KEY = **"YOUR SKY SCANNER API KEY FROM RAPIDAPI "**
> REACT_APP_API_URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/EUR/en-US/"
> REACT_APP_API_PLACE_URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query="

Now in the console, go to the client folder and enter the commands:

npm install

npm start

which will install the dependencies and start the app. Hooray!

Go to http://localhost:3000/ to see the app.

Search for flights.

Bon Voyage!
