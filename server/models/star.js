module.exports = ( sequelize, DataTypes ) => {
  class Star extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Star.belongsTo( models.user, { 
        foreignKey: 'userID'
       } )
    }
  }

  Star.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    // user_id: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    projectType: { type: DataTypes.ENUM( 'post', 'innerSource', 'resource' ), allowNull: false },
    projectID: { type: DataTypes.UUID, allowNull: false }
  }, {
    sequelize, modelName: 'star'
});

  return  Star;
};
