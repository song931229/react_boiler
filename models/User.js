const mongoose = require('mongoose');
// Mongoose.prototype.Schema()
// The Mongoose Schema constructor

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})
// mongoose.model()
// The Mongoose Model constructor.
const User = mongoose.model('User', userSchema);


// module.exports()
// The module.exports object is created by the Module system. Sometimes this is not acceptable; many want their module to be an instance of some class. To do this, assign the desired export object to module.exports. Assigning the desired object to exports will simply rebind the local exports variable, which is probably not what is desired.
module.exports = { User }

// SchemaStringOptions()
// SchemaStringOptions.prototype.enum : Array of allowed values for this path
// SchemaStringOptions.prototype.lowercase : If truthy, Mongoose will add a custom setter that lowercases this string using JavaScript's built-in String#toLowerCase().
// SchemaStringOptions.prototype.match : Attach a validator that succeeds if the data string matches the given regular expression, and fails otherwise.
// SchemaStringOptions.prototype.maxLength : If set, Mongoose will add a custom validator that ensures the given string's length is at most the given number.
// SchemaStringOptions.prototype.minLength : If set, Mongoose will add a custom validator that ensures the given string's length is at least the given number.
// SchemaStringOptions.prototype.populate : Sets default populate options.
// SchemaStringOptions.prototype.trim : If truthy, Mongoose will add a custom setter that removes leading and trailing whitespace using JavaScript's built-in String#trim().
// SchemaStringOptions.prototype.uppercase : If truthy, Mongoose will add a custom setter that uppercases this string using JavaScript's built-in String#toUpperCase().