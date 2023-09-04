import { Category } from "../modules/category.js";

// GET http://localhost:8855/api/v1/categories # Done ////
export const categoriesGETALL = async (req, res) => {
  try {
    const categoryList = await Category.find().select("-__v");

    if (categoryList.length == 0) {
      return res
        .status(200)
        .json({ status: res.statusCode, message: `category empty` });
    }

    return res.status(200).send(categoryList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST http://localhost:8855/api/v1/categories # /////
export const categoriesPOST = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const category = new Category({ name, icon, color });
    const dbCategory = await category.save();
    res.status(201).json({
      status: res.statusCode,
      id: dbCategory._id,
      message: `category successfully created`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE http://localhost:8855/api/v1/categories/ID_9876543  # Done
export const categoriesDELETE = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ message: `category is deleted successfully` });
      } else {
        return res.status(400).json({ message: `category not found` });
      }
    })
    .catch((error) => {
      return res.status(500).json({ status: `id ${req.params.id} invalid` });
    });
};

// GET http://localhost:8855/api/v1/categories/ID_9876543 # Done    ///////
export const categoriesGETBYID = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).select("-__v");
    if (category == null) {
      return res.status(400).json({
        status: res.statusCode,
        message: `category not found`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ status: `id ${req.params.id} invalid` });
  }
};

// PUT http://localhost:8855/api/v1/categories/ID_9876543 # Done .
export const categoriesPUT = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { name, icon, color },
      { new: true }
    ).select("-__v");

    if (!category) {
      return res.status(400).json({
        message: "Category not found",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ status: `id ${req.params.id} invalid` });
  }
};
