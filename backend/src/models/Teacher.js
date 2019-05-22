export const Teacher = (sequelize, DataTypes) => {
    return sequelize.define('Teacher', {
        userCode : {
            type : DataTypes.STRING(5),
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING(11),
            allowNull : false,
            unique : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        }
    });
};