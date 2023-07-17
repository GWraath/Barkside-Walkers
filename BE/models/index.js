'use strict'

const Appointments = require('./appointments') //require the model
const Users = require('./users') //require the model

async function init() {
    await Appointments.sync();
    await Users.sync();
  
    
    //sync the model
};

init();
module.exports = {
    Appointments, //export the model
    Users //export the model
};

