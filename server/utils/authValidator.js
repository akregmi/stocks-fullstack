const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const JWT_SECRET = process.env.JWT_SECRET

module.exports.signUpValidator = [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body('firstName').isAlpha().withMessage("Invalid name"),
    body('lastName').isAlpha().withMessage("Invalid name")
];

module.exports.validResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() });
    }
    next();
}

module.exports.userAlreadyExists = async (req, res, next) => {
    const potentialUser = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [req.body.email]
    );
    if (potentialUser.rowCount > 0){
        return res.status(400).json({ error: "User already exists." });
    }
    console.log(potentialUser.rowCount);
    next();
}

module.exports.validSession = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token){
        return res.status(401).json({ error: "Not authorized" });
    }
    try{
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        console.error(err.message);
        res.status(401).json({ error: "Invalid token" });
    }
}