const express = require("express");
const app = express();
const PORT = 3000;
const usersList = require("./userData");

app.use(express.json());

app.get("/all-users", (req, res) => {
  res.status(200).json({ data: usersList });
});

//single user is showing a 200 status in postman and I have no errors in the terminal and yet The number isnt pulling up in postman
//I'm not sure where I went wrong
app.get("/single-user/:phoneNumber", (req, res) => {
  let result = usersList.find(findPhoneNumber);
  function findPhoneNumber(phoneNumber) {
    return phoneNumber.number;
  }
  res.status(200).json({ data: result });
});

//It's telling me that the properties of keys is undefined and I'm not sure why, and giving me 500 service error in Postman
//My assumtption was that if I used the key[country] it would retrieve the country I requested
//I couldnt figure the first part of this task so I was unable to complete it
app.get("/some-users/:countryName", (req, res) => {
  let users = req.params.usersList.Object.keys.value(country);
  const filterByCountry = usersList.filter((country) => {
    return country.country.toLowerCase().number.toLowerCase().includes(users);
  });
  res.status(200).json({ data: filterByCountry });
});

app.post("/new-user", (req, res) => {
  const newUser = {
    gender: req.body.gender,
    name: {
      title: req.body.title,
      first: req.body.first,
      last: req.body.last,
    },
    location: {
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postcode: req.body.postcode,
    },
    email: req.body.email,
    phone: req.body.email,
    cell: req.body.cell,
    nat: req.body.nat,
  };
  console.log(newUser);

  res.status(200).json({ message: "success" });
});

//I tried to follow what we went over in the express-intro but I am I totally at a loss on this one
app.put("/update-user/:email", (req, res) => {
  const email = req.params.email;
  const findIndex = usersList.findIndex((users) => {
    users.email === cell;
  });
  if (findIndex === -1) {
    res.status(400).json({ success: false, message: "user not found" });
  }
  const originalUserInfo = usersList[findIndex];

  const cell = req.body.cell;

  const updateUserInfo = { ...originalUserInfo };
  if (cell) {
    updateUserInfo.cell = cell;
  }
});

app.delete("/delete-user/:cellNumber", (req, res) => {
  const deleteUserCell = req.params.cell;
  const findUserIndex = usersList.findIndex(
    (users) => users.deleteUserCell === deleteUserCell
  );
  usersList.splice(findUserIndex, 1);
  res.status(200).json({ date: "movie-deleted" });
});

app.listen(PORT, () => {
  console.log(`Example App is listneing to port ${PORT}`);
});
