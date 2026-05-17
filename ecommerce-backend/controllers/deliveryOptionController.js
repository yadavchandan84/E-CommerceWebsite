import { DeliveryOption } from '../models/DeliveryOption.js';

export const getAllDeliveryOptions = async (req, res) => {
  try {
    const expand = req.query.expand;
    const deliveryOptions = await DeliveryOption.findAll();
    let response = deliveryOptions;

    if (expand === 'estimatedDeliveryTime') {
      response = deliveryOptions.map(option => {
        const deliveryTimeMs = Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000;
        return {
          ...option.toJSON(),
          estimatedDeliveryTimeMs: deliveryTimeMs
        };
      });
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching delivery options:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
