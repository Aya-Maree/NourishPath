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

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Replace with your actual database query to find the user by email
        const user = await db.User.findOne({ email }).exec();

        if (!user) {
            // If the user is not found, send a 401 Unauthorized response
            return res.status(401).json({ error: 'User not found' });
        }

        // Verify the password against the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // If the password doesn't match, send a 401 Unauthorized response
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If login is successful, return the user's name and email
        res.json({
            message: 'Logged in successfully',
            name: user.name, // Assuming the user object has a 'name' field
            email: user.email // The email is already known but included for completeness
        });

    } catch (error) {
        console.error('Login error:', error.message);
        // For any server error, send a 500 Internal Server Error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Search for recipes by ingredients
app.post('/api/recipes/search', async (req, res) => {
    try {
        const { ingredients } = req.body;

        // Use a case-insensitive regex to match ingredient names
        const regexIngredients = ingredients.map(ingredient => new RegExp(ingredient, 'i'));

        const recipes = await db.Recipe.find({
            'ingredients.ingredientName': { $all: regexIngredients }
        });

        if (recipes.length === 0) {
            const firstIngredientWithResults = await db.Recipe.findOne({
                'ingredients.ingredientName': regexIngredients[0]
            });

            if (firstIngredientWithResults) {
                res.status(404).json({
                    message: `We couldn't find a recipe with all your ingredients. However, we do have recipes with ${ingredients[0]}.`,
                    suggestions: [ingredients[0]],
                });
            } else {
                res.status(404).json({ message: 'No recipes found with the specified ingredients' });
            }
        } else {
            res.json(recipes);
        }
    } catch (error) {
        console.error('Error searching for recipes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve recipe details
app.get('/api/recipes/:recipeName', async (req, res) => {
    try {
        const { recipeName } = req.params;
        
        const recipe = await db.Recipe.findOne({ name: recipeName });

        if (!recipe) {
            res.status(404).json({ message: 'No recipe found with the specified name'});    
        } else {
            res.json(recipe);
        }
    } catch (error) {
        console.error('Error retrieving recipe:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/recipes/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, 'public', 'recipes', filename));
  });

app.post('/api/journals', async (req, res) => {
    try {
      const { email, entry } = req.body;
      const user = await db.User.findOne({ email }).exec(); // Find the user by email
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const newEntry = new db.JournalEntry({ 
        user: user._id, // Reference the user's ID
        entry 
      });
      await newEntry.save();
  
      res.status(201).json({ message: 'Journal entry saved successfully', entry: newEntry });
    } catch (error) {
      console.error('Error saving journal entry:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/journals', async (req, res) => {
    try {
      const { email, title, entry } = req.body;
  
      // Logic to find the user by email
      const user = await db.User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Create a new journal entry
      const newJournal = new db.JournalEntry({
        user: user._id, // user's ObjectId from the User collection
        title,
        entry
      });
  
      // Save the journal entry
      await newJournal.save();
  
      res.status(200).json({ message: 'Journal entry saved successfully' });
    } catch (error) {
      console.error('Error saving journal entry:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  