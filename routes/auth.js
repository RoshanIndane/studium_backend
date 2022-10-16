const express = require("express");
const authUserOrAdmin = require("../controller/auth");
const controller = require("../controller/auth");
const routes = express.Router();

routes.post("/login", authUserOrAdmin);


module.exports = routes;
