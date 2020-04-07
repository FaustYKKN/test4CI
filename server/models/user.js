// const bcrypt = require('bcrypt');
// const { passwordSaltRounds } = require( '../config/config' );

module.exports = ( sequelize, DataTypes ) => {
  class User extends sequelize.Sequelize.Model {

    static associate ( models ) {
      User.belongsTo( models.uploadFile, {
        foreignKey: 'avatar',
        constraints: false
      } );
      User.hasMany( models.userDownload, {
        foreignKey: 'userID',
        constraints: false
      } );
      User.hasMany( models.thirdPartyServicesInfo, {
        foreignKey: 'owner',
        constraints: false
      } );
      // User.belongsTo( models.permissionGroup, {
      //   foreignKey: 'permission'
      // } );
    }
  }

  User.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: { type: DataTypes.STRING, allowNull: false }, // self | sso
    worknumber: { type: DataTypes.INTEGER, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    ssoId: { type: DataTypes.STRING, allowNull: true },
    moblie: { type: DataTypes.STRING, allowNull: true  },
    permission: { type: DataTypes.INTEGER, allowNull: true }
    // privateToken: { type: DataTypes.STRING, allowNull: true },
    // nodebbToken: { type: DataTypes.STRING, allowNull: true },
    // group: { type: DataTypes.UUID, allowNull: true }
  }, {
    sequelize,
    modelName: 'user',
  });

  // bcrypt加密
  // User.beforeCreate( async ( user, options ) => {
  //   const salt = await bcrypt.genSalt( passwordSaltRounds );
  //   user.password && (user.password = await bcrypt.hash( user.password, salt ));
  //   return user;
  // } );

  return  User;

};
