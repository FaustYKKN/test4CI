module.exports = ( sequelize, DataTypes ) => {
  class Setting extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  }

  Setting.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    property: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize, modelName: 'setting'
});

  return  Setting;
};
