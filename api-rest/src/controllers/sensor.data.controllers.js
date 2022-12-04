import db from '../database/database.js';
var jwt = require('jsonwebtoken');
import { JWT } from '../config.js';


export const createSensorData = async (req, res) => {
    const { api_key, json_data } = req.body;
    try {
        var decoded = jwt.verify(api_key, JWT.SECRET);
        const sensor_name = decoded.sensor_name;
        const sql = `SELECT * FROM sensor WHERE sensor_name = ?`;

        db.serialize(() => {
            db.get(sql, [sensor_name], (err, row) => {
                if (err) {
                    res.status(400).json({
                        error: err.message,
                        message: 'El sensor no se encuentra en la base de datos'
                    });
                    return;
                }
            });
        });
        // insert json_data in database
        const sql2 = db.prepare(`INSERT INTO sensor_data (temp_max, temp_min, humidity_percentage, sensor_name) VALUES (?, ?, ?, ?)`);
        for (const row of json_data) {
            sql2.run(row.temp_max, row.temp_min, row.humidity_percentage, sensor_name);
        }
        res.status(201).json({
            message: 'Datos insertados correctamente'
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Unauthorized'
        });
    }
};


export const getSensorData = async (req, res) => {
    const { sensor_id } = req.body;
    let name_sensor = []
    const sql = `SELECT * FROM sensor WHERE sensor_id = ?`;
    for (const id of sensor_id) {
        const data = await getData(id, sql);
        name_sensor.push(data.sensor_name);
    }
    console.log(name_sensor);
    const sql2 = `SELECT * FROM sensor_data WHERE sensor_name = ?`;
    let data = [];
    for (const name of name_sensor) {
        const data2 = await getData2(name, sql2);
        console.log(data2);
        data.push(data2);
    }
    res.status(200).json({
        data
    });

    db.serialize(function () {
        db.all("select * from sensor_data", function (err, tables) {
            if (err) {
                console.log(err);
            }
            // console.log(tables);
        });
    });

}

const getData = (id, sql) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
}

const getData2 = (id, sql) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    });
}