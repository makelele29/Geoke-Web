

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('localizacion', {
    ID_LOCALIZACION: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_GYMKHANA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ID_PREGUNTAS: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    X: {
      type: 'DOUBLE',
      allowNull: false
    },
    Y: {
      type: 'DOUBLE',
      allowNull: false
    }
  }, {
    tableName: 'localizacion'
  });
};
