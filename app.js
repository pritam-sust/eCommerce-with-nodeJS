const http = require("http");

const path = require("path");

const rootDir = require("./util/path");

const bodyParser = require("body-parser");

const express = require("express");

const app = express();


////For handlebars engine
// const expressHbs = require("express-handlebars");
// app.engine(
//   "hbspritam",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbspritam",
//   })
// );
// app.set("view engine", "hbspritam");

////For pug engine
//app.set("view engine", "pug");

////For ejs engine
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
  //res.status(405).sendFile(path.join(rootDir, "views", "404.html"));
});
//const server = http.createServer(app);

app.listen(3001);
