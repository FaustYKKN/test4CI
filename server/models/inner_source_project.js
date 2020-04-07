module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceProject extends sequelize.Sequelize.Model {

    static associate ( models ) {
      InnerSourceProject.belongsTo( models.user, {
        foreignKey: 'userID'
      } );
      InnerSourceProject.belongsTo( models.comment, {
        foreignKey: 'commentID',
      } );
      InnerSourceProject.belongsTo( models.article, {
        foreignKey: 'articleID', 
        constraints: false,
      } );
      InnerSourceProject.hasMany( models.postLink, {
        // foreignKey: 'postID',
        // constraints: false,
        onDelete: "CASCADE",
      } );
      InnerSourceProject.belongsTo( models.uploadFile, {
        foreignKey: 'coverImgID',
        as: 'coverImg',
        constraints: false,
      } );
      // InnerSourceProject.belongsToMany( models.user, {
      //   through: models.like,
      //   as: 'likes',
      //   foreignKey: 'project_id'
      // } );
      InnerSourceProject.belongsToMany( models.innerSourceCategory, {
        // as: 'projectType',
        through: 'innerSourceTypeThrough',
        foreignKey: 'projectID'
      } );
    }
  } 

  InnerSourceProject.init({
    id: { type: DataTypes.UUID, primaryKey: true }, 
    // user_id: { type: DataTypes.UUID, allowNull: false },
    // comment_id: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    gitlabStarCount: { type: DataTypes.INTEGER, allowNull: true },
    gitlabProjectID: { type: DataTypes.UUID, allowNull: true },
    // cover_img: { type: DataTypes.STRING, allowNull: true },
    gitlabRepository: { type: DataTypes.STRING, allowNull: false },
    commentShowIndex: { type: DataTypes.STRING, allowNull: false },
    // article: { type: DataTypes.UUID, allowNull: true },
    // likes: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: true },
    // project_type: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: false },
  }, { sequelize, modelName: 'innerSourceProject' });

  return  InnerSourceProject;
};
