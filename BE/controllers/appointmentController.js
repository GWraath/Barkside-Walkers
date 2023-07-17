"use strict";
const Models = require("../models");

const getAppointments = (req, res) => {
    // const limit = JSON.parse(req.query.limit)
    // const offset = JSON.parse(req.query.offset)
    Models.Appointments.findAll({
        // limit: limit,
        // offset: offset
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getAppointmentsByID = (req, res) => {
    Models.Appointments.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getAppointmentsByUserID = (req, res) => {
    Models.Appointments.findAll({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createAppointments = (data, res) => {
    Models.Appointments.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const updateAppointments = (req, res) => {
    Models.Appointments.update(req.body, {
        where: {
            id:
                req.params.id
        }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}
const deleteAppointments = (req, res) => {
    Models.Appointments.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const lockAppointments = (req, rest) => {
    Models.Appointments.findAll({

        // const [results, metadata] = await sequelize.query(
        //     "SELECT c.*, u.id AS userId FROM comments c JOIN users u ON c.userId = u.id"
        //   );
        // transaction: t1,
        lock: {
            // level: t1.LOCK,
            of: Models.Appointments
        }
    });
}

const unlockAppointments = (req, rest) => {
    Models.Appointments.findAll({
        unlock: {
            // level: t1.LOCK,
            of: Appointments
        }
    });
}

module.exports = {
    getAppointments, createAppointments, updateAppointments, deleteAppointments, getAppointmentsByID, getAppointmentsByUserID, lockAppointments, unlockAppointments
}