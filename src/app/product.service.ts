import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', description: 'Product 1 description', price: 10, creationDate: new Date() },
    { id: 2, name: 'Product 2', description: 'Product 2 description', price: 20, creationDate: new Date() },
    { id: 3, name: 'Product 3', description: 'Product 3 description', price: 30, creationDate: new Date() },
    { id: 4, name: 'Product 4', description: 'Product 4 description', price: 40, creationDate: new Date() },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  searchProducts(query: string): Product[] {
    return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  }
}
