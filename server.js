// Import required modules
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

// Set up Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URI and database name
const mongoURI = 'mongodb+srv://dvizcarr:TJVPg5dcfwJqhMYg@cruzhacks.dpkyaf6.mongodb.net/CruzConnect'; // Update with your MongoDB URI
const dbName = 'CruzConnect'; // Update with your database name

// Function to connect to MongoDB and insert a new document
async function insertDocument(data) {
  const client = new mongodb.MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('notes'); // Update with your collection name

    // Insert data into MongoDB
    const result = await collection.insertOne(data);
    console.log(`Document inserted with _id: ${result.insertedId}`);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Route to handle form submissions
app.post('/', (req, res) => {
  const formData = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    people: parseInt(req.body.people),
    price: parseInt(req.body.price),
  };

  // Call the function to insert data into MongoDB
  insertDocument(formData);

  res.send('Form data submitted successfully!');
});

// Start the server
const port = 3000; // Update with your desired port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});