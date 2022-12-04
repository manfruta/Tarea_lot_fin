import db from '../database/database.js';
var jwt = require('jsonwebtoken');
import { JWT } from '../config.js';


export const createSensor = async (req, res) => {
    const { location_id, sensor_name, sensor_category, sensor_meta } = req.body;
    const payload = {
        location_id: location_id,
        sensor_name: sensor_name,
        sensor_category: sensor_category,
        sensor_meta: sensor_meta,
        checked: true
    }
    const token = jwt.sign(
        payload,
        JWT.SECRET,
        {
            expiresIn
                : '100h'
        }
    );
    const sql = 'INSERT INTO sensor (location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (?, ?, ?, ?, ?)';
    const params = [location_id, sensor_name, sensor_category, sensor_meta, token];

    db.serialize(() => {
        db.run(sql, params
            , function (err, result) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: { location_id: location_id, sensor_name: sensor_name, sensor_category: sensor_category, sensor_meta: sensor_meta, sensor_api_key: token },
                    id: this.lastID
                })
            }
        );
    });
}

export const getAllSensor = async (req, res) => {
    const sql = 'SELECT * FROM sensor';
    db.all
        (sql, (err, rows) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        }
        );
}

export const getSensor = async (req, res) => {
    const sql = 'SELECT * FROM sensor WHERE sensor_id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        })
    }
    );
}

export const putSensor = async (req, res) => {
    const { sensor_name, sensor_category, sensor_meta } = req.body;
    const sql = 'UPDATE sensor SET sensor_name = ?, sensor_category = ?, sensor_meta = ? WHERE sensor_id = ?';
    const params = [sensor_name, sensor_category, sensor_meta, req.params.id];
    db.run(sql, params,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: { sensor_name: sensor_name, sensor_category: sensor_category, sensor_meta: sensor_meta },
                changes: this.changes
            })
        }
    );
}


export const deleteSensor = async (req, res) => {
    const sql = 'DELETE FROM sensor WHERE sensor_id = ?';
    const params = [req.params.id];
    db.run(sql, params,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: 'deleted', changes: this.changes })
        }
    );
}
