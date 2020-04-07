module.exports = ( sequelize, DataTypes ) => {
  class UploadFile extends sequelize.Sequelize.Model {

    static associate ( models ) {
      UploadFile.belongsTo( models.user, { 
        foreignKey: 'userID'
      } )
      UploadFile.belongsTo( models.userDownload, {
        foreignKey: 'lastDownloadId',
        constraints: false
      } );
    }
  }

  UploadFile.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    mime: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false },
    // user_id: { type: DataTypes.UUID, allowNull: false },
    downloadCount: { type: DataTypes.INTEGER, allowNull: false },
    // last_down_id: { type: DataTypes.UUID, allowNull: false }
  }, {
    sequelize, 
    modelName: 'uploadFile'  
  });

  return  UploadFile;
};
