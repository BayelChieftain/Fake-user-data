const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { faker, fakerPL, fakerFR, fakerEN_US } = require('@faker-js/faker');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


function applyErrors(text, errorAmount) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < errorAmount; i++) {
    const errorType = Math.floor(Math.random() * 3); 
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
    let fullName, address, city, country, phoneNumber;
    let uid = faker.string.uuid();
    if (region === 'USA') {
      fullName = fakerEN_US.person.fullName();
      city = fakerEN_US.location.city();
      country = 'USA';
      phoneNumber = fakerEN_US.phone.number();
    } else if (region === 'France') {
      fullName = fakerFR.person.fullName();
      city = fakerFR.location.city();
      country = 'France';
      phoneNumber = fakerFR.phone.number();
    } else if (region === 'Poland') {
      fullName = fakerPL.person.fullName();
      city = fakerPL.location.city();
      country = 'Poland';
      phoneNumber = fakerPL.phone.number();
    } else {
      fullName = faker.person.fullName()
      city = faker.location.city();
      country = 'Unknown';
      phoneNumber = faker.phone.imei();
    }
    address = `${country}, ${city}`;

    const errorName = errorAmount > 0 ? applyErrors(fullName, errorAmount) : fullName;

    data.push({ uid, fullName: errorName, address, phoneNumber });
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
