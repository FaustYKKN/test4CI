module.exports = ( sequelize, DataTypes ) => {
  class PostCategory extends sequelize.Sequelize.Model {

    static associate ( models ) {
      PostCategory.hasMany( models.post, {
        foreignKey: 'postType'
      } );
    }
  }

  PostCategory.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    nodebbCid: { type: DataTypes.STRING, allowNull: true }
  }, { sequelize, modelName: 'postCategory' });

  return  PostCategory;
};
