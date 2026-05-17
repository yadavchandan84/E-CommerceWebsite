import { sequelize } from '../models/index.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { defaultProducts } from '../defaultData/defaultProducts.js';
import { defaultDeliveryOptions } from '../defaultData/defaultDeliveryOptions.js';
import { defaultCart } from '../defaultData/defaultCart.js';
import { defaultOrders } from '../defaultData/defaultOrders.js';

export const resetDatabase = async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    const timestamp = Date.now();

    const productsWithTimestamps = defaultProducts.map((product, index) => ({
      ...product,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    }));

    const deliveryOptionsWithTimestamps = defaultDeliveryOptions.map((option, index) => ({
      ...option,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    }));

    const cartItemsWithTimestamps = defaultCart.map((item, index) => ({
      ...item,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    }));

    const ordersWithTimestamps = defaultOrders.map((order, index) => ({
      ...order,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    }));

    await Product.bulkCreate(productsWithTimestamps);
    await DeliveryOption.bulkCreate(deliveryOptionsWithTimestamps);
    await CartItem.bulkCreate(cartItemsWithTimestamps);
    await Order.bulkCreate(ordersWithTimestamps);

    res.status(204).send();
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
