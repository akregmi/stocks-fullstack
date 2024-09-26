const pool = require('../config/db');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        const fullname = firstName + " " + lastName;
        const userId = req.user.userId;
        const hashedPassword = await bcrypt.hash(password, 10);
        const update = await pool.query(
            "UPDATE users SET fullname=$1, email=$2, password=$3 WHERE user_id=$4",
            [fullname, email, hashedPassword, userId]
        );
        res.status(200).json({
            user: {
                userId: userId,
                fullname: fullname,
                email: email
            }
        })
    } catch (err){
        console.error(err.message);
        res.status(500).json( {error: "Server Error"} )
    }
}

module.exports.getUser = async (req, res) => {
    try{
        const user = await pool.query(
            "SELECT * FROM users WHERE user_id=$1",
            [req.user.userId]
        );
        res.status(200).json({
            userId: user.rows[0].user_id,
            fullname: user.rows[0].fullname,
            email: user.rows[0].email,
        })
    } catch (err){
        console.error(err.message);
        res.status(500).json( {error: "Server Error"} )
    }
}