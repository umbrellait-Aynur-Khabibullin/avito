export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName?: string;
  createdAt: string;
  imageUrl?: string;
};

export type AddProductPayload = {
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName?: string;
};
