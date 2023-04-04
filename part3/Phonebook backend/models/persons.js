require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => console.log("connection failed", e.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
