module.exports = ( sequelize, DataTypes ) => {
  class PermissionGroup extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  }

  PermissionGroup.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: false },
    permission: { type: DataTypes.STRING, allowNull: false }
  }, { sequelize, modelName: 'permissionGroup' });

  return  PermissionGroup;
};
