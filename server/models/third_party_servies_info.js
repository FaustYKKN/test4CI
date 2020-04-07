module.exports = ( sequelize, DataTypes ) => {
  class ThirdPartyServiesInfo extends sequelize.Sequelize.Model {

    static associate ( models ) {
      ThirdPartyServiesInfo.belongsTo( models.user, {
        foreignKey: 'owner',
      } );
    }
  }

  ThirdPartyServiesInfo.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    serveName: { type: DataTypes.STRING, allowNull: false },
    json: { type: DataTypes.TEXT, allowNull: null },
  }, { sequelize, modelName: 'thirdPartyServicesInfo' });

  return  ThirdPartyServiesInfo;
};
