
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/appointmentController");

router.get('/', (req, res) => { 
    Controllers.getAppointments(req, res);
})

router.get('/:id', (req, res) => {
    Controllers.getAppointmentsByID(req, res);
})

router.get('/userAppointments/:userid', (req, res) => {
    Controllers.getAppointmentsByUserID(req, res);
})

router.post('/create', (req, res) => {
    // console.log(req.body)
    Controllers.createAppointments(req.body, res)
})

router.put('/put/:id', (req, res) => {
    console.log('test')
    Controllers.updateAppointments(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.deleteAppointments(req, res)
})

router.lock('/', (req, res) => {  
    Controllers.lockAppointments(req, res);
})

router.unlock('/', (req, res) => {  
    Controllers.unlockAppointments(req, res);
})

module.exports = router;