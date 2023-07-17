const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
// const Users = require("./users")

class Appointments extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Appointments.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },

    // userID: {
    //     type: DataTypes.INTEGER, allowNull: true, required: true,
    //     references: {
    //         model: Users, //reference to another model
    //         key: 'id' //column name of the referenced model
    //     }
    // },
    // name: {
    //     type: DataTypes.STRING, allowNull: true, required: true,
    //     references: {
    //         model: Users, //reference to another model
    //         key: 'name' //column name of the referenced model
    //     }
    // },
    appointment: {
        type: DataTypes.DATE, allowNull: false, required: true
    },
    // paid: {
    //     type: DataTypes.BOOLEAN, allowNull: true, required: true
    // },
    amount: {
        type: DataTypes.INTEGER, allowNull: false, required: true
    },
   
   
},
    {
        sequelize: sequelizeInstance, modelName: 'Appointments', timestamps: true, freezeTableName: true
    }
)
module.exports = Appointments;


