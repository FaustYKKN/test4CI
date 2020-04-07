module.exports = ( sequelize, DataTypes ) => {
  class Comment extends sequelize.Sequelize.Model {

    static associate ( models ) {
    }
  }

  Comment.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    nodebbCategoryID: { type: DataTypes.INTEGER, allowNull: true },
    nodebbTopicID: { type: DataTypes.INTEGER, allowNull: true },
  }, { sequelize, modelName: 'comment' });

  return  Comment;
};
