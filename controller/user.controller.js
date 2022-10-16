const user = require("../model/user");
const { body, validationResult } = require('express-validator');
// const { use } = require("../routes/api");

const createUser = [
  body("name").isLength({ min: 3 }).isAlpha().withMessage("name is invalid"),
  body("designation").isLength({ min: 1 }).isAlpha().withMessage("designation is invalid"),
  body("email").isLength({ min: 3 }).isEmail().withMessage("email is invalid"),
  body("salary").isNumeric().withMessage("salary is invalid"),
  async (req, res, next) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const data = await user.findOne({ email: req.body.email }).lean().exec();
      if (data) return res.json({ data: {}, message: "user already exist", status: false, });

      next()
    }
    catch (err) {
      return res.json({ data: {}, message: err.message, status: false, });
    }


  },
  async (req, res) => {
    try {
      let obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        salary: req.body.salary,
        role: req.body.role ? req.body.role : "user",
        profileImage: req.body.profileImage,
        designation: req.body.designation,
        userName: req.body.email.split("@")[0],
        paidStatus: false,
      };
      const createUser = await user.create(obj);
      return res.json({ data: createUser, message: "created user ", status: true, });
    } catch (err) {
      return res.json({ data: {}, message: err.message, status: "false", });
    }
  },
];
const getUsers = [
  async (req, res) => {
    // if (req.body.role == "user") return res.json({ data: {}, message: "you are not able to see data" })
    try {
      const usersData = await user.find().lean().exec();
      return res.json({
        data: usersData,
        message: "recieved user ",
        status: true,
      });
    } catch (err) {
      return res.json({
        data: {},
        message: "unable to create user ",
        status: "false",
      });
    }
  },
];
const getUserById = [
  async (req, res) => {
    try {

      let data = await user.findById(req.params.id)

      return res.json({ data, message: "created user ", status: true });
    } catch (err) {
      return res.json({
        data: {},
        message: "unable to create user ",
        status: "false",
      });
    }
  },
];
const updateUser = [
  async (req, res) => {
    try {

      const data = await user.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
      return res.json({ data: data, message: "created user ", status: true });
    } catch (err) {
      return res.json({
        data: {},
        message: "unable to create user ",
        status: "false",
      });
    }
  },
];
const deleteUser = [
  async (req, res) => {
    try {
      const data = await user.deleteOne({ _id: req.params.id })
      return res.json({ data, message: " user deleted ", status: true });
    } catch (err) {
      return res.json({
        data: {},
        message: "unable to create user ",
        status: "false",
      });
    }
  },
];

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
