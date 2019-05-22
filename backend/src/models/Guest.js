export const Guest = (sequelize, DataTypes) => {
    return sequelize.define('Guest', {
        userCode : {
            type : DataTypes.STRING(5),
            primaryKey : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        }
    });
};