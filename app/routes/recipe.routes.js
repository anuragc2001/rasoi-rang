const express = require('express');
const router = express.Router();
const { exploreCategories, 
        exploreCategoriesById,
        exploreRecipe, 
        exploreLatest, 
        exploreRandom } = require('../controllers/explore.controller');

const { searchRecipe } = require('../controllers/search.controller');

const { homepage } = require('../controllers/homepage.controller');

const { submitRecipe, submitRecipeOnPost } = require('../controllers/recipe.controller');

router.get('/', homepage);

router.get('/recipe/:id', exploreRecipe );
router.get('/categories', exploreCategories);
router.get('/categories/:id', exploreCategoriesById);
router.get('/explore-latest', exploreLatest);
router.get('/explore-random', exploreRandom);

router.post('/search', searchRecipe);

router.get('/submit-recipe', submitRecipe);
router.post('/submit-recipe', submitRecipeOnPost);

router.get('/about', (req, res) => {
        res.render('about', { title: 'Rasoi Rang - About' } );
});

router.get('/contact', (req, res) => {
        res.render('contact', { title: 'Rasoi Rang - Contact' } );
});


 
module.exports = router;