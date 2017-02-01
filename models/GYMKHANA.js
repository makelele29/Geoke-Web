/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GYMKHANA', {
    id_gymkhana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_gymk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_ini: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'GYMKHANA',
    timestamps: false
  });
};
