export const Account = (sequelize, DataTypes) => {
    return sequelize.define('Account', {
        id : {
            type : DataTypes.STRING(50),
            primaryKey : true,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        userCode : {
            type : DataTypes.STRING(5),
            allowNull : false,
            unique : true
        },
        auth : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });
};