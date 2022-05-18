module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('budget', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        budget_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        budget_amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        budget_month:{
            type: DataTypes.STRING,
            allowNull: false
        },
        // user_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // category_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    },{ timestamps: true })

    return Budget;
}