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

// Search for recipes by ingredients
app.post('/api/recipes/search', async (req, res) => {
    try {
        const { ingredients } = req.body;

        const recipes = await db.Recipe.find({ 'ingredients.ingredientName': { $all: ingredients } });

        if (recipes.length === 0) {
            const firstIngredientWithResults = await db.Recipe.findOne({'ingredients.ingredientName': ingredients[0]});

            if (firstIngredientWithResults) {
                res.status(404).json({
                    message: `We couldn't find a recipe with all your ingredients. However, we do have recipes with ${ingredients[0]}.`,
                    suggestions: [ingredients[0]],
                });
            } else {
                res.status(404).json({ message: 'No recipes found with the specified ingredients'});
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  