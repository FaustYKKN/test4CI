module.exports = ( sequelize, DataTypes ) => {
  class UserDownload extends sequelize.Sequelize.Model {

    static associate ( models ) {
      UserDownload.belongsTo( models.uploadFile, {
        foreignKey: 'fileID'
      } );
      UserDownload.belongsTo( models.user, {
        foreignKey: 'userID'
      } );
    }
  }

  UserDownload.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    // fileID: { type: DataTypes.UUID, allowNull: false },
    // userID: { type: DataTypes.UUID, allowNull: false },
  }, { sequelize, modelName: 'userDownload' });

  return  UserDownload;
};
