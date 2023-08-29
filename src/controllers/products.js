import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Product } from "../modules/product.js";
import { Category } from "../modules/category.js";

/// POST http://localhost:8855/api/v1/products # need to fix bugs # Done .
export const productsALL = async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    // Validate and find category
    const categoryId = await Category.findById(category);
    if (!categoryId) {
      return res.status(400).json({ message: "Invalid category" });
    }

    //
    // console.log(req.body.image.toString())
    if (!req.file) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "No image in the request" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/public/uploads/${
      req.file.filename
    }`;

    const product = new Product({
      name,
      description,
      richDescription,
      image: imageUrl,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      status: res.statusCode,
      id: savedProduct._id,
      message: "Product created",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error.message,
    });
  }
};

/// GET http://localhost:8855/api/v1/products/:id09876543 # Done .
export const productsBYID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({ path: "category", select: "-__v" })
      .select("-__v");
    if (!product) {
      return res
        .status(404)
        .json({ status: res.statusCode, error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// PUT http://localhost:8855/api/v1/product/id1234567 # Done .
export const productPUTBYID = async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      newReviews,
      isFeatured,
    } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ status: res.statusCode, message: "Invalid product Id" });
    }

    //
    const categoryId = await Category.findById(category);
    if (!categoryId)
      return res
        .status(404)
        .json({ status: res.statusCode, error: "category not found" });

    //
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        newReviews,
        isFeatured,
      },
      { new: true },
    );

    if (!product) {
      return res
        .status(404)
        .json({ status: res.statusCode, message: "product not found" });
    }

    return res.status(200).json({
      status: res.statusCode,
      id: product.id,
      message: `updated successfully`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// DELETE http://localhost:8855/api/v1/products/id09876543 # Done .
export const productsDELETE = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ status: res.statusCode, message: "product deleted" });
      } else {
        return res
          .status(404)
          .json({ status: res.statusCode, message: "product not found " });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ status: res.statusCode, error: `id ${req.params.id} Invalid` });
    });
};

/// GET http://localhost:8855/api/v1/products/get/count # Done .
export const productsGetCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    if (!productCount)
      return res
        .status(404)
        .json({ status: res.statusCode, message: "Products not found" });

    return res.status(200).json({ count: productCount });
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, error: error.message });
  }
};

/// GET http://localhost:8855/api/v1/products/get/featured/12 # Done .
export const productsGeFeaturedBYNUMBER = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true })
      .limit(+count)
      .select("-__v");
    if (!products)
      return res
        .status(404)
        .json({ status: res.statusCode, error: "Product not found" });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/// GET http://localhost:8855/api/v1/products?categories=87654,9786 # Done .
export const productsQueryList = async (req, res) => {
  try {
    // Query params..
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    //
    const allProduct = await Product.find(filter)
      .populate("category", "-__v")
      .select("-__v");
    if (allProduct == 0)
      return res
        .status(404)
        .json({ status: res.statusCode, message: `products not found` });

    return res.status(200).json(allProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ status: res.statusCode, message: error.message });
  }
};

/// PUT http://localhost:8855/api/v1/products/gallery-images/:id0987654 # need to fix bugs ..
export const galleryimagesBYID = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ error: "Invalid Product Id" });
    }

    const files = req.files;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    // Use the updated __dirname to define uploadFilesPath
    const uploadFilesPath = path.join(__dirname, "..", "public/uploads");

    const imagesPaths = [];

    if (files) {
      files.forEach((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { images: imagesPaths },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(500).json({ error: "Failed to update gallery" });
    }

    return res.status(200).json({
      id: updatedProduct._id,
      images: updatedProduct.images,
      message: "Images Updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


