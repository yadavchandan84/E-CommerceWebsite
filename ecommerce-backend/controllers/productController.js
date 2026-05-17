import { Product } from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const search = req.query.search;

    let products;
    if (search) {
      products = await Product.findAll();

      // Filter products by case-insensitive search on name or keywords
      const lowerCaseSearch = search.toLowerCase();

      products = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);

        const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearch));

        return nameMatch || keywordsMatch;
      });

    } else {
      products = await Product.findAll();
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
