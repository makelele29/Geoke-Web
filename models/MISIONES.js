/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MISIONES', {
    id_mision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_gymkhana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'GYMKHANA',
        key: 'id_gymkhana'
      }
    },
    pregunta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    respuesta1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    respuesta2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    respuesta3: {
      type: DataTypes.STRING,
      allowNull: false
    },
    respuesta4: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    respuesta_correcta: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'MISIONES',
    timestamps: false
  });
};
