const jwt = require("jsonwebtoken")

const jwt_verify = (req, res, next) => {
    try {

        let token = req.headers.authorization;
        let secret = "secret123"

        if (!token) return res.json({ data: {}, message: "you are not authrised", status: false })

        token = token.split(" ")[1];
        console.log(token)

        jwt.verify(token, secret, (err, user) => {
            if (err) return res.json({ data: {}, message: "you are not authrised", status: false })
            req.body.role = user.role
            req.body.email = user.email
        })

        next()
    }
    catch (err) {
        return res.json({ data: {}, message: "token is tampered" })
    }
}

module.exports = jwt_verify