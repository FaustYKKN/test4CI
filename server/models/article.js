module.exports = ( sequelize, DataTypes ) => {
  class Article extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Article.belongsTo( models.uploadFile, {
        foreignKey: 'contentFileID',
        as: 'contentFile',
        constraints: false
      } );
      Article.belongsTo( models.user, {
        foreignKey: 'userID',
        constraints: false
      } );
    }
  }

  Article.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    contentType: { type: DataTypes.ENUM( 'JSX', 'MD' ), allowNull: false },
    // content_file: { type: DataTypes.UUID, allowNull: false },
    // user_id: { type: DataTypes.UUID, allowNull: false }
  }, { sequelize, modelName: 'article' });

  return  Article;
};
