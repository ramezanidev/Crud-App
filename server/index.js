const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    phone: "1-477-935-8478 x6430",
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    phone: "210.067.6132",
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    phone: "586.493.6943 x140",
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    phone: "(775)976-6794 x41206",
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    phone: "024-648-3804",
  },
];

app.post("/users", (req, res) => {
  res.status(200).json(users);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    users = users.filter((user) => user.id != id);
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.post("/add", (req, res) => {
  const user = req.body;
  if (user) {
    user.id = (users[users.length - 1]?.id || 0) + 1;
    users.push(user);
    return res.status(201).end();
  }
  res.status(400).end();
});

app.post("/edit", (req, res) => {
  const data = req.body;
  if (data?.id) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.id == data.id) {
        users[i] = data;
         return res.status(200).end();
      }
    }
  }
  res.status(400).end();
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
