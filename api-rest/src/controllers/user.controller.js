import db from '../database/database.js';

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO admin (username, password) VALUES (?, ?)';
    const params = [username, password];
    db.serialize(() => {
        db.run(sql, params
            , function (err, result) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: req.body,
                    id: this.lastID
                })
            });
    });
}


export const getUser = async (req, res) => {
    db.serialize(function () {
        db.all("select * from admin", function (err, tables) {
            if (err) {
                console.log(err);
            }
            res.json({ admins: tables });
        });
    });
}
