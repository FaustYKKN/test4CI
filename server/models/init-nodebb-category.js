module.exports = ( sequelize, DataTypes ) => {
  class InitNodebbCategory extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  }

  InitNodebbCategory.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    passCategoryName: { type: DataTypes.STRING, allowNull: true },
    nodebbCategoryName: { type: DataTypes.STRING, allowNull: null },
    nodebbCategoryID: { type: DataTypes.INTEGER, allowNull: true }
  }, { sequelize, modelName: 'initNodebbCategory' });

  return  InitNodebbCategory;
};
