const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized You are Not Authenticated" });

    jwt.verify(token, process.env.SECURITY_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token Invalid" })
        }

        req.name = decoded.name;
        req.email = decoded.email;

        if (req.name) {
            next();
        } else {
            return res.status(403).json({ message: "Access Denied From Unauthorized Person" })
        }
    })

}

module.exports = verifyToken;