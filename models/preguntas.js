/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('preguntas', {
    ID_PREGUNTAS: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CUESTION: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RESPA: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RESPB: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RESPC: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RESPD: {
      type: DataTypes.STRING,
      allowNull: false
    },
    VERDADERA: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    BORRADO: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'preguntas'
  });
};
