const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

   // Modify the folder path in which responses need to be stored
  folderPath = './Responses/',
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  DEFAULT_MODE = 'writeFile',
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));


// POST /writeTxt - Write request body to a new text file
app.post('/writeTxt', (req, res) => {
  let uniqueIdentifier = req.body.uniqueIdentifier;

  if (!uniqueIdentifier) {
    return res.status(400).send('uniqueIdentifier is required');
  }

  let filePath = `${path.join(folderPath, uniqueIdentifier)}.txt`;
  
  // Write request body to the text file
  fs.writeFile(filePath, req.body.data, 'utf8', (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error writing to file');
    }
    res.send({ message: 'File written successfully', filePath });
  });
});

// POST /appendTxt - Append request body to an existing text file
app.post('/appendTxt', (req, res) => {
  let existingFile = req.body.existingFile;

  if (!existingFile) {
    return res.status(400).send('existingFile is required');
  }

  let filePath = `${path.join(folderPath, existingFile)}.txt`;

  // Append request body to the text file (create the file if it doesn't exist)
  fs.appendFile(filePath, req.body.responseData + '\n', 'utf8', (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error appending to file');
    }
    res.send({ message: 'File appended successfully', filePath });
  });
});


app.post('/writeAudio', (req, res) => {
  let extension = req.body.fileExtension || defaultFileExtension,
    fsMode = DEFAULT_MODE,
    uniqueIdentifier = req.body.uniqueIdentifier ? typeof req.body.uniqueIdentifier === 'boolean' ? Date.now() : req.body.uniqueIdentifier : false,
    filename = `${req.body.requestName}${uniqueIdentifier || ''}`,
    //filePath = `${path.join(folderPath, filename)}.${extension}`,
    filePath = `${path.join(folderPath, filename)}`,
    options = req.body.options || undefined;

    const audioData = Buffer.from(req.body.responseData.stream.data);

    fs[fsMode](filePath, audioData, (err) => {
      if (err) {
        console.log(err);
        res.send('Error');
      }
      else {
        res.send('Success');
      }
    });

});

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});