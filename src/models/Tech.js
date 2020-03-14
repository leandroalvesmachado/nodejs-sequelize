const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            tableName: 'techs', 
            paranoid: true,
            sequelize
        });
    }

    static associate(models) {
        // 1 user pode ter N techs e 1 tech pode ter N users
        this.belongsToMany(models.User, { foreignKey: 'user_id', through: 'user_techs' , as: 'users' });
    }
}

module.exports = Tech;