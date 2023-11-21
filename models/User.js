//this imports the required dependencies from mongoose libray
const { Schema, model, Types } = require('mongoose');
//this defines the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trime: true,
        },
        //email validation

        email: {
            trype: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
                }
            }
        },

        friends:[
            {
                type: Schema.Types.ObjectId,
                ref:'User',
            }
        ],

            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',

                }
        ],
    },
    {
        toJson: {
            virtuals: true,

        },
        id: false,
    }
);

//this defines the virtual property of fiendCount so that a number of friends can be returned.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});
const User = model('User', userSchema)
module.exports = User