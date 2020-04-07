module.exports = ( sequelize, DataTypes ) => {
  class Resource extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Resource.belongsToMany( models.resourceCategory, {
        as: 'resourceType',
        through: 'resourceTypeThrough',
        foreignKey: 'resourceID'
      } );
      // Resource.belongsTo( models.uploadFile, {
      //   foreignKey: 'coverImg'
      // } );
      // Resources.belongsToMany( models.upload_files, {
      //   as: 'files',
      //   through: 'resource_file_through',
      //   foreignKey: 'resource_id'
      // } ); // 我认为文件此处没有强关联关系。不应该创建与 files 的关联
      // Resource.belongsToMany( models.user, {
      //   through: models.like,
      //   as: 'likes',
      //   foreignKey: 'project_id'
      // } );
      // Resource.belongsTo( models.comment, {
      //   foreignKey: 'commentID',
      //   constraints: false,
      //   allowNull: true
      // } );
      // Resource.belongsTo( models.article, {
      //   foreignKey: 'articleID', 
      //   constraints: false,
      //   onDelete: "CASCADE",
      // } );
    }
  }

  Resource.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    // cover_img: { type: DataTypes.UUID, allowNull: false },
    // article: { type: DataTypes.UUID, allowNull: true },
    // files: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: true },
    // likes: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull: true },
    // comment_id: { type: DataTypes.UUID, allowNull: false },
    // resource_type: { type: DataTypes.ARRAY( DataTypes.UUID ), allowNull:false }
  }, { 
    sequelize, 
    modelName: 'resource'  
  });

  return  Resource;
};
