import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/User.js";

const createProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.json(error);
  }
}

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    await product.updateOne({ $set: req.body });
    res.status(200).json("Product Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    res.status(200).json(product);
  }
  catch (error) {
    res.status(500).json(error);
  }
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    await product.deleteOne();
    res.status(200).json("Product Deleted");
  }
  catch (error) {
    res.status(500).json(error);
  }
}

// Best Selling Products
const getBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await ProductModel.find({ BestSelling: true });

    res.json(bestSellingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

//Add Products to WishList
const addProductsToWishlist = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      let updatedWishlist;

      if (user.WishListedProducts.includes(productId)) {
        await UserModel.updateOne({ _id: userId }, { $pull: { WishListedProducts: productId } });
        updatedWishlist = user.WishListedProducts.filter((id) => id.toString() !== productId);
      } else {
        await UserModel.updateOne({ _id: userId }, { $push: { WishListedProducts: productId } });
        updatedWishlist = [...user.WishListedProducts, productId];
      }

      // Fetch details of wishlisted products
      const wishlistedProducts = await ProductModel.find({ _id: { $in: updatedWishlist } });

      res.status(200).json({ message: 'Operation successful', wishlistedProducts });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};



//Get WishListedProducts 
const getWishlistedProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the wishlisted product IDs
    const wishlistedProductIds = user.WishListedProducts;

    // Find the details of wishlisted products
    const wishlistedProducts = await ProductModel.find({ _id: { $in: wishlistedProductIds } });

    res.status(200).json({ wishlistedProducts });
  } catch (error) {
    console.error('Error fetching wishlisted product details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Pagination
const getProducts = async (req, res) => {
  try {
    let query = ProductModel.find();

    // Parse the page, limit, minPrice, and maxPrice from the query parameters
    let page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * pageSize;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    // Check if a category filter is provided in the query
    const categoryFilter = req.query.category;

    // Apply the category filter if provided
    if (categoryFilter) {
      query = query.where({ Category: categoryFilter });
    }

    // Apply price range filter if minPrice and maxPrice are provided
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      query = query.where('Price').gte(minPrice).lte(maxPrice);
    }

    // Create a separate query to count the total number of documents
    let countQuery = ProductModel.find();

    // Apply the category and price range filters to the count query
    if (categoryFilter) {
      countQuery = countQuery.where({ Category: categoryFilter });
    }
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      countQuery = countQuery.where('Price').gte(minPrice).lte(maxPrice);
    }

    // Execute the count query
    const total = await countQuery.countDocuments();

    // Calculate the total number of pages
    const pages = Math.ceil(total / pageSize);

    // If the requested page is out of range, reset it to 1
    if (page > pages) {
      page = 1;
    }

    // Execute the main query to fetch the products
    const result = await query.skip((page - 1) * pageSize).limit(pageSize);

    // Return the paginated and filtered results
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};



export {
  createProduct, updateProduct, deleteProduct, getProduct, getProducts, getBestSellingProducts, addProductsToWishlist,
  getWishlistedProducts,
};