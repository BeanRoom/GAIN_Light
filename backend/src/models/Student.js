export const Student = (sequelize, DataTypes) => {
    return sequelize.define('Student', {
        userCode : {
            type : DataTypes.STRING(5),
            primaryKey : true,
            allowNull : false
        },
        grade : {
            type : DataTypes.STRING(1),
            allowNull : false
        },
        class : {
            type : DataTypes.STRING(1),
            allowNull : false
        },
        number : {
            type : DataTypes.STRING(2),
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
        },
        greenpoint : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        redpoint : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });
};