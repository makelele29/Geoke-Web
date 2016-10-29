/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participa', {
    ALIAS: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    ID_GYMKHANA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    DURACION: {
      type: DataTypes.TIME,
      allowNull: false
    },
    ACIERTOS: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    COMPLETADA: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'participas'
  });
};
