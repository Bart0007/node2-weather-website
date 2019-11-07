const request = require("request");

const forecast = (a, b, callback) => {
  const url = `https://api.darksky.net/forecast/9608955b0038fd663dfb9aae1e77b0ac/${a},${b}?units=si&lang=pl
    `;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary}. The temperature is ${body.currently.temperature} and there is ${body.currently.precipProbability} chance of rain`
      );
    }
  });
};

module.exports = forecast;
