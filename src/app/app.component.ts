import { Component } from '@angular/core';
import { Product } from '.././models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  searchQuery: string = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  onAddProduct(): void {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: '',
      description: '',
      price: 0,
      creationDate: new Date()
    };
    this.selectedProduct = newProduct;
  }

  onSelectProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  onDeleteProduct(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
  }

  onSaveProduct(): void {
    if (this.selectedProduct) {
      if (this.productService.getProductById(this.selectedProduct.id)) {
        this.productService.updateProduct(this.selectedProduct);
      } else {
        this.productService.addProduct(this.selectedProduct);
      }
      this.products = this.productService.getProducts();
      this.selectedProduct = null;
    }
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.products = this.productService.searchProducts(this.searchQuery);
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'name') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'date') {
      this.products.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
    }
  }

  isValid(): boolean {
    return !!this.selectedProduct && this.selectedProduct.name.trim().length > 0 && this.selectedProduct.price > 0;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
