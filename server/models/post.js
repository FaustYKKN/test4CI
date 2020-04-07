module.exports = ( sequelize, DataTypes ) => {
  class Post extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Post.belongsTo( models.uploadFile, {
        foreignKey: 'coverImgID',
        as: 'coverImg'
      } );
      Post.belongsTo( models.user, {
        foreignKey: 'userID'
      } );
      Post.belongsTo( models.comment, {
        foreignKey: 'commentID'
      } );
      Post.hasMany( models.postLink, {
        foreignKey: 'postID',
        constraints: false,
        onDelete: "CASCADE",
      } );
      Post.belongsTo( models.article, {
        foreignKey: 'articleID'
      } );
      // Post.belongsToMany( models.user, {
      //   through: models.like,
      //   as: 'likes',
      //   foreignKey: 'project_id'
      // } );
      Post.belongsTo( models.postCategory, {
        foreignKey: 'postCategoryID'
      } );
    }
  }

  Post.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    commentShowIndex: { type: DataTypes.STRING, allowNull: false },
    // url: { type: DataTypes.STRING, allowNull: false },
    // cover_img: { type: DataTypes.UUID, allowNull: false },
    // header: { type: DataTypes.UUID, allowNull: true },
    // article: { type: DataTypes.UUID, allowNull: true },
    // likes: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: false },
    // comment_id: { type: DataTypes.UUID, allowNull: false },
    // user_id: { type: DataTypes.UUID, allowNull: false },
    // post_type: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: false }
  }, { sequelize, modelName: 'post' }); 

  return  Post;
};
