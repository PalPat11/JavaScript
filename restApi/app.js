import express from "express";
import __dirname from "./util/utilPath.js";

const app = express();

const flowers = [
  {
    name: "virág neve",
    category:
      "a kategóriát adod meg, mely lehet egyéves, évelő, szobanövény, mezei virág, stb",
  },
  {
    name: "virág neve",
    category:
      "a kategóriát adod meg, mely lehet egyéves, évelő, szobanövény, mezei virág, stb",
  },
  {
    name: "virág neve",
    category:
      "a kategóriát adod meg, mely lehet egyéves, évelő, szobanövény, mezei virág, stb",
  },
  {
    name: "virág neve",
    category:
      "a kategóriát adod meg, mely lehet egyéves, évelő, szobanövény, mezei virág, stb",
  },
];

const trees = [
  {
    name: "fa megnevezése",
    category: "lehet lombhullatú, örökzöld",
  },
  {
    name: "fa megnevezése",
    category: "lehet lombhullatú, örökzöld",
  },
  {
    name: "fa megnevezése",
    category: "lehet lombhullatú, örökzöld",
  },
  {
    name: "fa megnevezése",
    category: "lehet lombhullatú, örökzöld",
  },
  {
    name: "fa megnevezése",
    category: "lehet lombhullatú, örökzöld",
  },
];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/flowers", (req, res) => {
  res.json(flowers);
});

app.get("/trees", (req, res) => {
  res.json(trees);
});

app.get("/flowers/:id", (req, res) => {
  const param = req.params.id;
  console.log(param);
  res.json(flowers[param - 1]);
});

app.get("/trees/:id", (req, res) => {
  const param = req.params.id;
  console.log(param);
  res.json(trees[param - 1]);
});

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(3010, () => {
  console.log("service runs on port 3010");
});

app.post("/flowers", (req, res) => {
  /* const name = req.body.name;
    const category = req.body.category; */
  const { name, age } = req.body;
  console.log(`Name: ${name} category: ${cate}`);
  res.json({ name, category });
});
