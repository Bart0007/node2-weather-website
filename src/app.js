const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utills/geocode");
const forecast = require("./utills/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "BART"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT US APP from a dynamic file",
    name: "Boss Bart"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "let me help ya",
    title: "Help",
    name: "Bartlomiej"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
