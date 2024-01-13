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

module.exports = {
    User
};