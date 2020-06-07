export class Movie {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  productCategory: [
    {
      categoryId: number;
      category: null;
    }
  ];
  quantity: number = 1;
}
