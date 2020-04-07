module.exports = ( sequelize, DataTypes ) => {
  class PostLink extends sequelize.Sequelize.Model {

    static associate ( models ) {
      PostLink.belongsTo( models.post, {
        foreignKey: 'postID',
        constraints: false,
      } )
    }
  }

  PostLink.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    linkName: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false },
    linkType: { type: DataTypes.ENUM( 'URL', 'ID' ), allowNull: false }
  }, { sequelize, modelName: 'postLink' });

  return  PostLink;
};
