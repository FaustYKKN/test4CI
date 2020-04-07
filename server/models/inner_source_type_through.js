module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceTypeThrough extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  } 

  InnerSourceTypeThrough.init({
    id: { type: DataTypes.UUID, primaryKey: true }, 
  }, { sequelize, modelName: 'innerSourceTypeThrough' });

  return  InnerSourceTypeThrough;
};
