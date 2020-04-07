module.exports = ( sequelize, DataTypes ) => {
  class Header extends sequelize.Sequelize.Model {

    static associate ( models ) {
      Header.belongsTo( models.user, {
        foreignKey: 'userID',
        constraints: false
      } );
    }
  }

  Header.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    helpDocsUrl: { type: DataTypes.STRING, allowNull: true },
    tryOutUrl: { type: DataTypes.STRING, allowNull: true },
    dealingLicensesUrl: { type: DataTypes.STRING, allowNull: true },
    // user_id: { type: DataTypes.UUID, allowNull: false }
  }, { sequelize, modelName: 'header' });

  return  Header;
};
