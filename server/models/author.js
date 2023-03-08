'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book }) {
      // define association here
      this.hasMany(Book, { foreignKey: 'authorId', as: 'books' })
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  }
  Author.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Author must have a name!' },
        notEmpty: { msg: 'Name must not be empty!' }
      }
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'DOB must not be empty!' },
        notEmpty: { msg: 'DOB must not be empty!' },
        isDate(value) {
          if (isNaN(Date.parse(value))) {
            throw new Error('Invalid date format!');
          }
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Age must not be empty!' },
        notEmpty: { msg: 'Age must not be empty!' },
        isPositive(value) {
          if (value < 0) {
            throw new Error('Age must be a positive number!');
          } else if (value == 0) {
            throw new Error('Age must not be zero!');
          }
        }
      }
    },

  }, {
    sequelize,
    tableName: 'authors',
    modelName: 'Author',
  });
  return Author;
};