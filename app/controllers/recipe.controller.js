const Category = require('../models/category.model');
const Recipe = require('../models/recipe.model');

submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    res.redirect('/submit-recipe');
  } catch (error) {
    if(error.name === 'ValidationError'){
      req.flash('infoErrors', error);
    } else {
      req.flash('infoSubmit', 'Recipe has been added.')
    }
    res.redirect('/submit-recipe');
  }
}

deleteRecipe = async(req, res) => {
  try {
    await Recipe.deleteOne({ name: 'New Recipe From Form' });
  } catch (error) {
    console.log(error);
  }
}

updateRecipe = async(req, res) => {
  try {
    const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
    res.n; // Number of documents matched
    res.nModified; // Number of documents modified
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  submitRecipe,
  submitRecipeOnPost,
  deleteRecipe,
  updateRecipe
}






