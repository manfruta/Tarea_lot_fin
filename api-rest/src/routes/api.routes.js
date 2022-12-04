import { Router } from "express";
import { createUser, getUser } from "../controllers/user.controller";
import { createCompany, getCompany } from "../controllers/company.controller";

import { createLocacion, getLocation, getAllLocation, putLocation, deleteLocation } from "../controllers/location.controllers";
import { createSensor, getAllSensor, getSensor, putSensor, deleteSensor } from "../controllers/sensor.controllers";
import { createSensorData, getSensorData, deleteSensorData } from "../controllers/sensor.Data.controllers";

// import middlewares from "../middlewares";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to my API-manfred" });
});


//Create user and get user
router.post('/user', createUser)
router.get('/user', getUser)


//Create company and get company
router.post('/company', createCompany)
router.get('/company', getCompany)




// ENDPOINT: http://localhost:3000/api/v1/location
router.post('/location', verifyToken, createLocacion)
router.get('/location', verifyToken, getAllLocation)
router.get('/location/:id', verifyToken, getLocation)
router.put('/location/:id', verifyToken, putLocation)
router.delete('/location/:id', verifyToken, deleteLocation)

// ENDPOINT: http://localhost:3000/api/v1/sensor
router.post('/sensor', createSensor)
router.get('/sensor', verifyToken, getAllSensor)
router.get('/sensor/:id', verifyToken, getSensor)
router.put('/sensor/:id', verifyToken, putSensor)
router.delete('/sensor/:id', verifyToken, deleteSensor)


// ENDPOINT: http://localhost:3000/api/v1/sensor_data
router.post('/sensor_data', verifyToken, createSensorData)
router.get('/sensor_data', verifyToken, getSensorData)
// router.delete('/sensor_data/:id', verifyToken, deleteSensorData)











export default router;