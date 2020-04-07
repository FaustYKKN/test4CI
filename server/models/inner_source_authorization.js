module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceProjectAuthorization extends sequelize.Sequelize.Model {

    static associate ( models ) {
      InnerSourceProjectAuthorization.belongsTo( models.user, {
        foreignKey: 'userID'
      } );
      InnerSourceProjectAuthorization.belongsTo( models.innerSourceProject, {
        foreignKey: 'projectID'
      } );
    }
  }

  InnerSourceProjectAuthorization.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    unAuthorizaiton: { type: DataTypes.BOOLEAN, allowNull: false },
  }, { sequelize, modelName: 'innerSourceProjectAuthorization' });

  return  InnerSourceProjectAuthorization;
};
