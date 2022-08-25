/* Dependencies */
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

/* Activate dependencies */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/* GET Requests */
app.get("/", function (_req, res) {
	res.sendFile(__dirname + "/index.html");
});

/* POST Requests */
app.post("/", function (req, res) {
	const apiKey = "";
	const city = req.body.cityName;
	const URL =
		"https://api.openweathermap.org/data/2.5/weather?appid=" +
		apiKey +
		"&q=" +
		city +
		"&units=metric";

	https.get(URL, function (response) {
		console.log(response.statusCode);

		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const iconURL =
				"http://openweathermap.org/img/wn/" + icon + "@2x.png";
			const tempFeel = weatherData.main.feels_like;
			const humidity = weatherData.main.humidity;
			const country = weatherData.sys.country;

			res.write(
				"<h1>The weather temperature in " +
					city.toUpperCase() +
					" (" +
					country +
					") " +
					" is currently " +
					temp +
					" degrees Celsius with " +
					weatherDescription +
					"</h1>"
			);
			res.write(
				"<img style='text-align='center', width='200px'' src=" +
					iconURL +
					">"
			);
			res.write(
				"<h3>Thanks to the humidity rate (" +
					humidity +
					"%), you'll feel as if it were " +
					tempFeel +
					" degrees Celsius </h3>"
			);
			res.send();
		});
	});
});

/* Server port check */
app.listen(3000, function () {
	console.log("server is running on port 3000");
});
