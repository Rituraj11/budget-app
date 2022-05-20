module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('expense', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        expense_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        income: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        expense:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        spend_date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{ timestamps: true })

    return Expense;
}    