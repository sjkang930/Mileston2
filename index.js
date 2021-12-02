const express = require("express");
const fs = require("fs").promises;
const PORT = process.env.PORT || 8007;
const app = express();

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.post("/create", (req, res) => {
  const user = req.body;
  user.id = Math.floor(Math.random() * 500) + 1;

  console.log(user);
  fs.readFile("./database.json", "utf-8")
    .then((data) => {
    const fileContent = JSON.parse(data);
    console.log(fileContent)
    fileContent.users.push(user);
    fs.writeFile("database.json", JSON.stringify(fileContent))
    .then(() => res.redirect("/people/" + user.id))
    .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err));
});

app.get("/people/:id", (req, res) => {
  const mapping = {
    "CSS" :"fab fa-css3-alt",
    "HTML" :"fab fa-html5",
    "JS" :"fab fa-js",
    "Sass" :"fab fa-sass",
    "Git" :"fab fa-git-alt",
    "Gulp" :"fab fa-gulp",
    "NodeJS" :"fab fa-node-js",
    "NPM" :"fab fa-npm",
    "PHP" :"fab fa-php",
    "React" :"fab fa-react",
    }
 const id = req.params.id;
  fs.readFile("database.json", "utf-8")
  .then(content => JSON.parse(content).users)
  .then(listOfUser => listOfUser.find(user => user.id == id))
  .then(foundUser => res.render("homepage", { user: foundUser, mapping })) 
  .catch(err => console.log(err))
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
