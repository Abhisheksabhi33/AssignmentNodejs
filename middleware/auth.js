
const JWT_SECRET_KEY = "secretdfghjk";
const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        // const token = req.headers.authorization.split(" ")[1]
        if(!token) {
           return res.status(403).send("A token is required for authentication")
        }
        try {
           const decoded = jwt.verify(token, JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
          return res.status(401).send("Unauthorized. Invalid Token")
        }
    } catch(err) {
        next(err)
    }
}

module.exports = { verifyIsLoggedIn }