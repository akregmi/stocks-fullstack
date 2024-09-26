const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            'SELECT * FROM users WHERE email=$1',
            [email]
        )
        if (user.rowCount == 0){
            return res.status(400).json({ error: "Email not in use." });
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.rows[0].user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            user: {
                userId: user.rows[0].user_id,
                fullname: user.rows[0].fullname,
                email: user.rows[0].email,
            },
        });
    } catch (err){
        console.error(err.message);
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports.signUp = async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        const fullname = firstName + " " + lastName;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hashedPassword]
        )
        const token = jwt.sign({ userId: newUser.rows[0].user_id }, JWT_SECRET, {expiresIn: '3h'});
        res.status(201).json({
            token,
            user: {
                userId: newUser.rows[0].user_id,
                fullname: newUser.rows[0].fullname,
                email: newUser.rows[0].email
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}