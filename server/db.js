const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://amaree:oe6sjeWeJX2H59H3@nourishpath.gqolhyc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
    useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB...hellooo'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

const RecipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        ingredients: [
            {
                ingredientName: { type: String, required: true},
                measurement: { type: String, required: true},
            },
        ],
        instructions: { type: String, required: true},
    },
    { collection: 'recipes' }
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { User, Recipe };