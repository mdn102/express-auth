//  user model decleration
//  define use case 
'use strict';
const bcrypt = require('bcrypt');

//  declare user model format
module.exports = function(sequelize, DataTypes) {
    //  define user object 
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        }, 
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number.'
                }
            }
        }
    }, {
        hooks: {
            //  before record createtion
            beforeCreate: function(createdUser, options) {
                if (createdUser & createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash;
                }
                
            }
                
            
        }
    });
    user.associate = function(models) {
        // TODO: any user association you want 
    }
}   

//  take inputed password and compare to hashed password in user table
//  remove password setup before add
//  return user model
//  has new password to add to user table