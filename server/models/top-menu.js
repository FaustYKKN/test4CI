module.exports = ( sequelize, DataTypes ) => {
  class TopMenu extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  }

  TopMenu.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false }
  }, { sequelize, modelName: 'topMenu' });

  return  TopMenu;
};
