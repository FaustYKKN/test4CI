module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceCategory extends sequelize.Sequelize.Model {

    static associate ( models ) {
      InnerSourceCategory.belongsToMany( models.innerSourceProject, {
        // as: 'projectID',
        through: 'innerSourceTypeThrough',
        foreignKey: 'categoryID'
      } );
    }
  }

  InnerSourceCategory.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { sequelize, modelName: 'innerSourceCategory' });

  return  InnerSourceCategory;
};
