module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceApply extends sequelize.Sequelize.Model {

    static associate ( models ) {
      InnerSourceApply.belongsTo( models.user, {
        foreignKey: 'userID'
      } );
    }
  }

  InnerSourceApply.init({
    id: { type: DataTypes.UUID, primaryKey: true },
  }, { sequelize, modelName: 'innerSourceApply' });

  return  InnerSourceApply;
};
