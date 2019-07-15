const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const seed = require("./dbSeed/seed");
const path = require("path");
// ==============================================================
// IMPORTING ROUTES
// ==============================================================
const { songsRoutes } = require("./api/routes");
const app = express();

// =============================================================
// IMPORTING KEYS
// =============================================================
const { mongoURI } = require("./config");
// =============================================================
// START MONGO AND SERVER
// =============================================================
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const PORT = app.get("PORT") || 5000;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("===========================================");
    console.log("MONGO DB STARTED");
    app.listen(PORT, () => {
      console.log(`SERVER STARTED AT PORT ${PORT}`);
      console.log("===========================================");
    });
  })
  .catch(err => {
    console.log("Error starting server of mongo", err);
  });
// =============================================================
// MIDDLEWARES
// =============================================================
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
// -------------------------------------------------------------------------
// FETCH SONGS FROM PUBLIC DIRECOTRY AND STORE THEIR METADATA IN DATABASE
// -------------------------------------------------------------------------
seed();
// -------------------------------------------------------------------------
// ROUTES MIDDLEWARES
// -----------------------------------
app.use("/api/songs", songsRoutes);
// =============================================================
// ERROR MIDDLEWARE FOR PAGE NOT FOUND
// =============================================================
app.use((req, res, next) => {
  const error = new Error("404 Page Not Found");
  error.status = 404;
  return next(error);
});
// =============================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  if (app.get("env") === "development") {
    console.error(error);
  }
  return res.status(status).json({
    message: error.message
  });
});
// =============================================================
