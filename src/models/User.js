const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.INTEGER
        }, {
            tableName: 'users', 
            paranoid: true,
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
        // 1 user pode ter N techs e 1 tech pode ter N users
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs' ,as: 'techs' });
    }
}

module.exports = User;