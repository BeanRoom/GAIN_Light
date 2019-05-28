export const Laptop = (sequelize, DataTypes) => {
    return sequelize.define('Laptop', {
        roomName : {
            type : DataTypes.STRING(3),
            primaryKey : true,
            allowNull : false
        },
        seatNum : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false
        },
        userCode : {
            type : DataTypes.STRING(5),
            allowNull : true,
            unique : true
        }
    });
};