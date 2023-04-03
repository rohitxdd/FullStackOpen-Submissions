const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(process.argv);
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const uri = `mongodb+srv://user:${password}@cluster1.aqnu7xq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

function start() {
  const arr = process.argv;
  if (arr.length === 3) {
    Person.find({_id : "642ae90bc8f456d437c08cd2"})
      .then((doc) => {
        console.log("data", doc);
        mongoose.connection.close();
      })
      .catch((e) => console.log(e));
  } else if (arr.length === 5) {
    const name = arr[3];
    const number = arr[4];
    const newPerson = new Person({
      name: name,
      number: number,
    });
    newPerson
      .save()
      .then((result) => {
        console.log(result);
        mongoose.connection.close();
      })
      .catch((e) => console.log(e));
  }
}

(async function () {
  try {
    await mongoose.connect(uri).then(() => console.log("connected"));
    console.log("Connection Successful");
    start();
  } catch (e) {
    console.log(error);
  }
})();
