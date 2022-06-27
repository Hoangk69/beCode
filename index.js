const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const { ADIMIN } = require("./math");

let user = "";
let products = [];

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use("/products", (req, res, next) => {
  if (user.email === ADIMIN.email && user.pass === ADIMIN.pass) {
    console.log("Login secces!");
    next();
  } else if (user === "") {
    res.json({ type: "required login!" });
  } else {
    res.json({ type: "email or pass wrong!" });
  }
});

app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  user = { email, pass };
  res.json({ type: "login!" });
});

app.get("/products", (req, res) => {
  res.json({ data: products.filter(product => product) });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  const id = Date.now().toString();
  console.log(id);
  const itemProduct = {
    id,
    name,
    price,
  };
  products.push(itemProduct);
  res.json({ type: "Add product seccec" });
});

app.delete("/products/:id", (req, res) => {
  if (products) {
    products.filter(product => product);  // refsh
    const isCheck = products.findIndex((product)=>{
      console.log(product.id, req.params.id)
      return product.id === req.params.id;
    })
    // console.log(1212313, isCheck);
    // console.log(index);
    console.log(isCheck);

    products.filter(product => product);  // refsh
    if (isCheck != -1) {
      
      delete products[isCheck];
      
      res.json({ type: "delete succes" });
      return products.filter(product => product);  // refsh
    } else {
      res.json({ type: "delete fail" });
    }
  }
});

app.get("/", (req, res) => {
  res.json({ mess: "log" });
});

app.get("/news", (req, res) => {
  res.json(req.query);
});

app.get("/:id/:action", (req, res) => {
  res.json(req.params);
});

app.get("/users", (req, res) => {
  res.json({ message: "this is get users" });
});

app.post("/users", (req, res) => {
  let user = fs.readFileSync("note.txt").toString().trim();
  let dataFile = user.split("\n");
  let dataBody = req.body;

  if (
    dataFile.some((data) => {
      return data === dataBody;
    })
  ) {
    res.send("User exist");
  } else {
    fs.appendFile("note.txt", req.body + "\n", (err) => {
      if (err) {
        res.json({ type: "err" });
      } else {
        res.send(req.body);
      }
    });
  }
});

app.get("/users", (req, res) => {
  fs.readFile("note.txt", (err, data) => {
    if (err) {
      res.json({ type: "err" });
    } else {
      res.send(data);
    }
  });
});
app.listen(port, () => {
  console.log(`---App listening on port ${port}---`);
});
