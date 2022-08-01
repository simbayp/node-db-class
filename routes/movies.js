import express from "express";
import { client } from "../index.js";
const router = express.Router();

// endpoint --> /movies

router.get("/", async function (req, res) {
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
router.post("/", async function (req, res) {
  const data = req.body;

  // To create all movies in db in mongodb syntax
  // db.movies.insertMany({});

  // To create all movies in db in nodejs syntax, the data is coming from mongodb database
  const result = await client.db("b36wd").collection("movies").insertMany(data);

  res.send(result);
});

// endpoint --> /movies/id

router.get("/:id", async function (req, res) {
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

router.delete("/:id", async function (req, res) {
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

router.put(" /:id", async function (req, res) {
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

export const moviesRouter = router;
