const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const port = 5000;


// Simulated data stored in memory
let data = {
  counter: 0
};


// Simulated function to refresh data in the frontend application
function refreshData() {
  // Example logic to refresh the data
  data.counter++;
  console.log('Data refreshed:', data);
};

// Webhook registration and receiving
const webhookURL = 'http://localhost:5000/webhook';
let webhookRegistered = false;
var key = null

// Check if webhook is already registered
if (!webhookRegistered) {
  // Register the webhook
  axios.post('https://flexhire.com/api/register-webhook',{
    headers: {
      'FLEXHIRE-API-KEY': key,
      'Content-Type': 'application/json',
    },
  } , {
    url: webhookURL
  })
    .then(response => {
      console.log('Webhook registered successfully');
      webhookRegistered = true;
    })
    .catch(error => {
      console.error('Failed to register webhook:', error);
    });
};

// Route to receive webhook from Flexhire
app.post('/webhook', (req, res) => {
  // Handle the received webhook data
  const webhookData = req.body;
  key = req.body.key;

  // Trigger a refresh of data in the frontend application
  refreshData();

  // Send a response to Flexhire indicating successful processing of the webhook
  res.sendStatus(200);
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
});