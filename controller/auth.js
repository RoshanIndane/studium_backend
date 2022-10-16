const user = require("../model/user");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
// const { use } = require("../routes/api");

const authUserOrAdmin = [

    body("password").isLength({ min: 1 }).isAlpha().withMessage("password is invalid"),
    body("userName").isLength({ min: 3 }).withMessage("user name is invalid"),

    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const data = await user.findOne({ userName: req.body.userName, password: req.body.password }).lean().exec();
            if (!data) return res.json({ data: {}, message: "user name or password is wrong", status: false, });

            let token=jwt.sign({role:data.role,id:data.email},"secret123")
            console.log(data._id)

            return res.json({ data: token, message: `${data.name} loged in seuccessfully`, status: true })
        }
        catch (err) {
            return res.json({ data: {}, message: err.message, status: false, });
        }


    }

];


module.exports = authUserOrAdmin