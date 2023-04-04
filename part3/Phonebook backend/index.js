const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/persons");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("build"));

morgan.token("payload", function (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : null;
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.payload(req, res),
    ].join(" ");
  })
);

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((result) => {
      const arrOfPersons = result.map((e) => e.toJSON());
      res.status(200).json(arrOfPersons);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json([]);
    });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (name && number) {
    const newContact = new Person({
      name: name,
      number: number,
    });
    newContact
      .save()
      .then((result) => {
        return res.status(201).json(result.toJSON());
      })
      .catch((e) => {
        next(e);
      });
  } else {
    return res.sendStatus(400);
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((e) => {
      next(e);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const newObj = req.body;
  delete newObj.id;

  Person.findByIdAndUpdate(id, newObj, { new: true })
    .then((result) => res.status(200).json(result.toJSON()))
    .catch((e) => next(e));
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.writeHead(200, { "content-type": "text/plain" });
      res.write(`Phonebook had info for ${result.length} people\n`);
      res.write(new Date().toString());
      res.end();
    })
    .catch((e) => next(e));
});

function UnknownPathHandler(req, res) {
  return res.status(404).json({ message: "404 resource Not Found" });
}

function errorHandler(err, req, res, next) {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ message: "Something went wrong" });
  next();
}

app.use(UnknownPathHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at Port ${PORT}`);
});
