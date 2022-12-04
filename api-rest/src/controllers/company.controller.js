import db from '../database/database.js';
var jwt = require('jsonwebtoken');
import { JWT } from '../config.js';

export const createCompany = async (req, res) => {
    const { company_name } = req.body;
    const payload = {
        company_name: company_name,
        checked: true
    }
    const token = jwt.sign(
        payload,
        JWT.SECRET,
        { expiresIn: '10h' }
    );
    const sql = 'INSERT INTO company (company_name, company_api_key) VALUES (?, ?)';
    const params = [company_name, token];

    db.serialize(() => {
        db.run(sql, params
            , function (err, result) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: { company_name: company_name, company_api_key: token },
                    id: this.lastID
                })
            }
        );
    });
}

export const getCompany = async (req, res) => {
    db.serialize(function () {
        db.all("select * from company", function (err, tables) {
            if (err) {
                console.log(err);
            }
            res.json({ company: tables });
        });
    });

}