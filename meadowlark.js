const express = require("express");
const { engine } = require("express-handlebars");
const fortune = require("./lib/fortune");
const app = express();
const port = process.env.PORT || 3000;

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => {
  res.render("about", { fortune: fortune.getFortune() });
});
app.use((req, res) => {
  res.status(404);
  res.render("404");
});
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});
app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost:${port}; ` +
      `нажмите Ctrl+C для завершения.`
  )
);
