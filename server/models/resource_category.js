module.exports = ( sequelize, DataTypes ) => {
  class ResourcesCategory extends sequelize.Sequelize.Model {

    static associate ( models ) {
      ResourcesCategory.belongsToMany( models.resource, {
        as: 'resourceID',
        through: 'resourceTypeThrough',
        foreignKey: 'categoryID'
      } );
    }
  }

  ResourcesCategory.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true }, 
  }, { 
    sequelize, 
    modelName: 'resourceCategory'
  });

  return  ResourcesCategory;
};
