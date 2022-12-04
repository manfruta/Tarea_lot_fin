//getLocation, getAllLocation, putLocation, deleteLocation

import db from "../database/database";

export const createLocacion = async (req, res) => {
    const { company_id, location_name, location_country, location_city, location_meta } = req.body;
    const sql = `INSERT INTO location (company_id, location_name, location_country, location_city, location_meta) VALUES ($1, $2, $3, $4, $5)`;
    const values = [company_id, location_name, location_country, location_city, location_meta];
    db.serialize(() => {
        db.run(sql, values
            , function (err) {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ message: "Location created successfully", id: this.lastID, data: req.body });
            });
    });
};


export const getLocation = async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM location WHERE id = $1`;
    db.serialize(() => {
        db.get(sql, [id], (err, row) => {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: "Location found", data: row });
        });
    });
};

export const getAllLocation = async (req, res) => {
    const sql = `SELECT * FROM location`;
    db.serialize(() => {
        db.all
            (sql, function (err, rows) {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success all',
                    data: rows
                })
            }
            );
    });
}

export const putLocation = async (req, res) => {
    const { id } = req.params;
    const { company_id, location_name, location_country, location_city, location_meta } = req.body;
    const sql = `UPDATE location SET company_id = $1, location_name = $2, location_country = $3, location_city = $4, location_meta = $5 WHERE id = $6`;
    const values = [company_id, location_name, location_country, location_city, location_meta, id];
    db.serialize(() => {
        db.run(sql, values
            , function (err) {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
                res.status(200).json({ message: "Location updated successfully", id: this.lastID, data: req.body });
            }
        );
    });
};


export const deleteLocation = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM location WHERE id = ${id}`;
    db.serialize(() => {
        db.run(sql, function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.json({ message: "deleted", changes: this.changes });
        }
        );
    });
}


