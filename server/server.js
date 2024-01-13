const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db'); 
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());


app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new db.User({ name, email, password: hashedPassword});
        await user.save();

    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  