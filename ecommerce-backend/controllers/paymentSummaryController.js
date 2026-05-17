import { CartItem } from '../models/CartItem.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';

export const getPaymentSummary = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    let totalItems = 0;
    let productCostCents = 0;
    let shippingCostCents = 0;

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      const deliveryOption = await DeliveryOption.findByPk(item.deliveryOptionId);
      totalItems += item.quantity;
      productCostCents += product.priceCents * item.quantity;
      shippingCostCents += deliveryOption.priceCents;
    }

    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    res.json({
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents
    });
  } catch (error) {
    console.error('Error calculating payment summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
