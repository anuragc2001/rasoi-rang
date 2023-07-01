const Category = require('../models/category.model');
const Recipe = require('../models/recipe.model');

searchRecipe = async(req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const recipe = await Recipe.find({$or: [{name: {$regex: searchTerm, $options: 'i'}}, {description: {$regex: searchTerm, $options: 'i'}}]});
    // console.log(searchTerm);
    res.render('search', { title: 'Cooking Blog - Search', recipe } );
    // res.json(recipe);
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
  
}

module.exports = {
  searchRecipe
}



