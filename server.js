// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function generateRandomPhoneNumber(region) {
  let phoneNumber;
  if (region === 'US') {
    phoneNumber = faker.phone.phoneNumberFormat(); // US phone number format
  } else if (region === 'France') {
    phoneNumber = faker.phone.phoneNumberFormat('+33 ## ## ## ## ##'); // France phone number format
  } else if (region === 'Poland') {
    phoneNumber = faker.phone.phoneNumberFormat('+48 ### ### ###'); // Poland phone number format
  } else {
    // Add more conditions for other regions as needed
    phoneNumber = faker.phone.phoneNumberFormat();
  }
  return phoneNumber.replace(/[-\s]/g, ''); // Remove dashes and spaces for simplicity
}



function applyErrors(text, errorAmount) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < errorAmount; i++) {
    const errorType = Math.floor(Math.random() * 3); // 0: delete, 1: add, 2: swap
    const position = Math.floor(Math.random() * text.length);

    if (errorType === 0 && text.length > 1) {
      text = text.slice(0, position) + text.slice(position + 1);
    } else if (errorType === 1) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      text = text.slice(0, position) + randomChar + text.slice(position);
    } else if (errorType === 2 && position < text.length - 1) {
      text = text.slice(0, position) + text[position + 1] + text[position] + text.slice(position + 2);
    }
  }

  return text;
}

function generateData(region, seed, errorAmount, page) {
  faker.seed(Number(seed) + Number(page));
  const data = [];

  for (let i = 0; i < 20; i++) {
    const name = faker.name.firstName();
    const surname = faker.name.lastName();
    const address = faker.address.city();
    const phoneNumber = generateRandomPhoneNumber(region);

    const errorName = errorAmount > 0 ? applyErrors(name, errorAmount) : name;

    data.push({ name: errorName, surname, address, phoneNumber });
  }

  return data;
}



app.post('/generate', (req, res) => {
  const { region, seed, error_amount: errorAmount, page } = req.body;
  const data = generateData(region, seed, errorAmount, page);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
