const express = require("express");
const controller = require("../controller/user.controller");
const jwt_verify = require("../middleWare/verify.jwt");
const routes = express.Router();

routes.post("/api/create-user", controller.createUser);
routes.get("/api/list-user", jwt_verify, controller.getUsers);
routes.get("/api/single-user/:id", controller.getUserById);
routes.patch("/api/update-user/:id", controller.updateUser);
routes.delete("/api/delete-user/:id", controller.deleteUser);

module.exports = routes;
