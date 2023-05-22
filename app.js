const express = require("express");
const app = express();
const PORT = 3000;
const usersList = require("./userData");

app.use(express.json());

app.get("/all-users", (req, res) => {
  res.status(200).json({ data: usersList });
});

app.get("/single-user/:phoneNumber", (req, res) => {
  const compareMe = req.params.phoneNumber;
  let result = usersList.find(findPhoneNumber);
  function findPhoneNumber(phoneNumber) {
    return phoneNumber.phone === compareMe;
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
      title: req.name.title,
      first: req.name.first,
      last: req.name.last,
    },
    location: {
      city: req.location.city,
      state: req.location.state,
      country: req.location.country,
      postcode: req.location.postcode,
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
app.put("/update-user/:userEmail", (req, res) => {
  console.log("hello");

  const email = req.params.userEmail;
  console.log(email);
  const findIndex = usersList.findIndex((user) => {
    return user.email === email;
  });
  console.log(usersList);
  if (findIndex === -1) {
    return res.status(400).json({ success: false, message: "user not found" });
  }
  const user = usersList[findIndex];
  const updateUserInfo = { ...user };

  for (let key in req.body) {
    if (typeof req.body[key] === "object") {
      updateUserInfo[key] = {
        ...updateUserInfo[key],
        ...req.body[key],
      };
    } else {
      updateUserInfo[(key = req.body[key])];
    }
  }
  console.log("after", updateUserInfo);
  usersList.splice(findIndex, 1, updateUserInfo);

  res.status(200).json({ success: true });
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
