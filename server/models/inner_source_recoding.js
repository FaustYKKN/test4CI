module.exports = ( sequelize, DataTypes ) => {
  class InnerSourceRecoding extends sequelize.Sequelize.Model {

  }

  InnerSourceRecoding.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    gitlabStarCount: { type: DataTypes.INTEGER, allowNull: true },
    gitlabProjectID: { type: DataTypes.UUID, allowNull: true },
    gitlabRepository: { type: DataTypes.STRING, allowNull: false },
    commentShowIndex: { type: DataTypes.STRING, allowNull: false },
    userID: { type: DataTypes.UUID, allowNull: false },
    commentID: { type: DataTypes.UUID, allowNull: true },
    articleID: { type: DataTypes.UUID, allowNull: true },
    coverImgID: { type: DataTypes.UUID, allowNull: true },
  }, { sequelize, modelName: 'innerSourceRecoding' });

  return  InnerSourceRecoding;
};
