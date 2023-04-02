const express = require("express");
const app = express();
let personsData = require("./data.json");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

morgan.token("payload", function (req, res) {
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
  res.json(personsData);
});

app.post("/api/persons", (req, res) => {
  console.log(req.method);
  const { name, number } = req.body;
  if (name && number) {
    const isNameExist = personsData.find(
      (person) => person.name === name.trim()
    );
    if (isNameExist) {
      return res.status(403).json({ error: "name must be unique" });
    } else {
      const id = Math.floor(Math.random() * 9999999);
      const newContact = {id, name, number}
      personsData.push(newContact);
      return res.status(201).json(newContact);
    }
  } else {
    return res.sendStatus(400);
  }
});

app.get("/api/persons/:id", (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const person = personsData.find((e) => e.id === Number(id));
  if (person) {
    return res.status(200).json(person);
  } else {
    return res.sendStatus(404);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  try {
    const { id } = req.params;
    personsData = personsData.filter((e) => e.id !== Number(id));
    res.sendStatus(204);
  } catch (e) {
    throw e;
  }
});

app.get("/info", (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write(`Phonebook had info for ${personsData.length} people\n`);
  res.write(new Date().toString());
  res.end();
});

function UnknownPathHandler(req, res) {
  return res.status(404).json({ message: "404 resource Not Found" });
}

function errorHandler(err, req, res, next) {
  console.log(err.message, err);
  res.status(500).json({ message: "Something went wrong" });
}

app.use(UnknownPathHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening");
});
