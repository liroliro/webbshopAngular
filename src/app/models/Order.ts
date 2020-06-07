export class Order {
  id: number;
  companyId: number = 1337;
  firstName: string;
  lastName: string;
  paymentMethod: string;
  totalPrice: number;
  products: [
    {
      id: number;
      quantity: number;
    }
  ];
}
