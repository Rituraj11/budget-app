module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_income: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: true })

    return User;
}