// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('html'));

// CreateFile endpoint
app.post('/createFile', (req, res) => {
  const { filename, content } = req.body;
  fs.writeFile(`./html/${filename}`, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating file.');
    } else {
      res.status(200).send('File created successfully.');
    }
  });
});

// GetFiles endpoint
app.get('/getFiles', (req, res) => {
  fs.readdir('./html', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading files.');
    } else {
      res.status(200).json(files);
    }
  });
});

// GetFile endpoint
app.get('/getFile/:filename', (req, res) => {
  const { filename } = req.params;
  fs.readFile(`./html/${filename}`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send('File not found.');
    } else {
      res.status(200).send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
