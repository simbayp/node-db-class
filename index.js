// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// This will put the URL in a variable called process.env
dotenv.config();

console.log(process.env.MONGO_URL); // env --> environment variables

const app = express();

const PORT = 3000;

// const MONGO_URL = "mongodb://localhost:27017"; // nodejs 16 and before
// const MONGO_URL = "mongodb://127.0.0.1"; // nodejs 16+

// using ATLAS
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  // client is like the 'live wire' connection between mongodb and nodejs
  const client = new MongoClient(MONGO_URL); // It is like dialing a number
  await client.connect(); // It is like pressing the call button
  console.log("Mongo is connected 👍 😀");
  return client; // To use the client globally i.e. outside the createConnection function
}

const client = await createConnection(); // Get the client as a global variable name

// we need a middleware i.e. express to tell nodejs that the body is in JSON format
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World 👍🏻 🌎");
});

// we don't need this anymore since data is coming from database
/*
const movies = [
  {
    id: "100",
    name: "RRR",
    poster:
      "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
    rating: 8.8,
    summary:
      "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
    trailer: "https://www.youtube.com/embed/f_vbAtFSEc0",
  },
  {
    id: "101",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU",
  },
  {
    id: "102",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0",
  },
  {
    id: "103",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
  },
  {
    id: "104",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
  },
  {
    id: "105",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: "106",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
  },
  {
    id: "107",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
  },
];
*/

// endpoint --> /movies

app.get("/movies", async function (req, res) {
  // To get all movies from db in mongodb syntax
  // db.movies.find({});

  // rating should be a number
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  console.log(req.query);

  // To get all movies from db in nodejs syntax
  // find({}) doesn't return an object, it returns a cursor --> which is paginations
  // const movies = await client.db("b36wd").collection("movies").find({});

  // we add .toArray() to display all data without pagination, also Postman GET request shows data properly. Basically we are converting our cursor to an arrray
  const movies = await client
    .db("b36wd")
    .collection("movies")
    .find(req.query)
    .toArray();

  res.send(movies);
});

// we need to convert the body -> JSON
// for this we need a middleware i.e. express to tell nodejs that the body is in JSON format
app.post("/movies", async function (req, res) {
  const data = req.body;

  // To create all movies in db in mongodb syntax
  // db.movies.insertMany({});

  // To create all movies in db in nodejs syntax, the data is coming from mongodb database
  const result = await client.db("b36wd").collection("movies").insertMany(data);

  res.send(result);
});

// endpoint --> /movies/id

app.get("/movies/:id", async function (req, res) {
  // To get a particular movie from db in mongodb syntax
  // db.movies.findOne({id: "101"});

  const { id } = req.params;
  console.log(req.params, id);

  // 'find' will return the first matched element while 'filter' will return an array of all matched elements
  // const movie = movies.find((element) => {
  //   return element.id === id;
  // });
  // console.log(movie);

  // To get a particular movie from db in nodejs syntax, the data is coming from mongodb database
  const movie = await client
    .db("b36wd")
    .collection("movies")
    .findOne({ id: id });

  movie ? res.send(movie) : res.status(404).send({ msg: "Movie not found!" });
});

app.delete("/movies/:id", async function (req, res) {
  // To delete a particular movie from db in mongodb syntax
  // db.movies.deleteOne({id: "101"});

  const { id } = req.params;
  console.log(req.params, id);

  // 'find' will return the first matched element while 'filter' will return an array of all matched elements
  // const movie = movies.find((element) => {
  //   return element.id === id;
  // });
  // console.log(movie);

  // To delete a particular movie from db in nodejs syntax, the data is coming from mongodb database
  const result = await client
    .db("b36wd")
    .collection("movies")
    .deleteOne({ id: id });

  result.deletedCount > 0
    ? res.send({ msg: "Movie successfully deleted" })
    : res.status(404).send({ msg: "Movie not found!" });
});

app.put("/movies/:id", async function (req, res) {
  const data = req.body;

  // To update a particular movie from db in mongodb syntax
  // db.movies.updateOne({id: "101"}, {$set: data});

  const { id } = req.params;
  console.log(req.params, id);

  const result = await client
    .db("b36wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  result.modifiedCount > 0
    ? res.send({ msg: "Movie successfully modified" })
    : res.status(400).send({ msg: "Movie not found!" });

  // result ? res.send(result) : res.status(404).send({ msg: "Movie not found" });
});

app.listen(PORT, () => console.log(`App has started at port ${PORT}`));

// package.json

// {
//   "name": "db",
//   "version": "1.0.0",
//   "description": "This is for GUVI class.",
//   "main": "index.js",
//   "type": "module",
//   "scripts": {
//     // This has been added so that 'npm start' will work
//     "start": "node index.js",
//    // This has been added so that 'nodemon run dev' will work

//     "dev": "nodemon index.js",
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "author": "Vivek",
//   "license": "ISC",
//   "dependencies": {
//     "express": "^4.18.1"
//   }
// }
