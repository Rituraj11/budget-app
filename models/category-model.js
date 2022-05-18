module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        category_name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{ timestamps: true })

    return Category;
}