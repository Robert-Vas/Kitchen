/**
 * The type of payment method used in an order.
 */
export enum PaymentType {
  Credit = "credit",
  PayPal = "paypal",
  Cash = "cash",
}

/**
 * The type of delivery method used for an order.
 */
export enum DeliveryMethod {
  Pickup = "pickup",
  Delivery = "delivery",
}

/**
 * The status of an order.
 */
export enum OrderStatus {
  Start = "start",
  Processing = "processing",
  Ready = "ready",
  Delivering = "delivering",
  Done = "done",
  Canceled = "canceled",
}

/**
 * The delivery-specific properties of an order.
 * Contains details that would only exist on an order if the delivery method is "delivery".
 */
export interface Delivery {
  deliveryType: DeliveryMethod.Delivery;
  address: string;
}

/**
 * The pickup-specific properties of an order.
 * Contains details that would only exist on an order if the delivery method is "pickup".
 */
export interface Pickup {
  deliveryType: DeliveryMethod.Pickup;
  locationId: string;
}

/**
 * A summary of the order's payment.
 */
export interface PaymentSummary {
  discount: number;
  tax: number;
  subtotal: number;
}

/**
 * Persists details of the order's dishes that are either necessary to process the order
 * or are subject to change after the order is placed.
 */
export interface OrderedDishDetails {
  price: number;
  count: number;
  readyOn: Date;
}

/**
 * Represents an order placed by a user for one or more dishes.
 */
export type Order = (Pickup | Delivery) & {
  id?: string;
  userId: string;
  createdOn: string;
  paymentType: PaymentType;
  /**
   * Contains the identifier used by the `paymentType` payment processor.
   *
   * Can be null if `paymentType` is `PaymentType.Cash` or if the payment has yet to be processed.
   */
  paymentId?: string;
  status: OrderStatus;
  orderedDishes: {
    [id: string]: OrderedDishDetails;
  };
  paymentSummary: PaymentSummary;
};
