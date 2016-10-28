/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gymkhana', {
    ID_GYMKHANA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ALIAS: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FECHA_INI: {
      type: DataTypes.DATE,
      allowNull: false
    },
    FECHA_FIN: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'gymkhana'
  });
};
