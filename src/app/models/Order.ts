import { OrderRow } from './OrderRow';

export class Order {
  id: number;
  companyId = 1337;
  firstName: string;
  lastName: string;
  paymentMethod: string;
  totalPrice: number;
  products: OrderRow[];
}
