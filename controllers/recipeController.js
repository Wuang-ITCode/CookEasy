const Recipe = require('../models/Recipe');

exports.addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, video } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      image,
      video
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Công thức đã được thêm!', recipe: newRecipe });
  } catch (error) {
    console.error('Lỗi khi thêm công thức:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
