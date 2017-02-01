/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PARTICIPA', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    tiempo: {
      type: DataTypes.TIME,
      allowNull: false
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_mision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MISIONES',
        key: 'id_mision'
      }
    },
    id_gymkhana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'PARTICIPA'
  });
};
