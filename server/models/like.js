module.exports = ( sequelize, DataTypes ) => {
  class Like extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Like.belongsTo( models.user, { 
        foreignKey: 'userID'
       } )
    }
  }

  Like.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    // user_id: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    projectType: { type: DataTypes.ENUM( 'post', 'innerSource', 'resource' ), allowNull: false },
    projectID: { type: DataTypes.UUID, allowNull: false }
  }, {
    sequelize, modelName: 'like'
});

  return  Like;
};
