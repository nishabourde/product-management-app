import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] // Comment this line if stylesheet is not available
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  @Output() selectProduct = new EventEmitter<Product>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onSelectProduct(product: Product): void {
    this.selectProduct.emit(product);
  }

  onAddProduct(): void {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: '',
      price: 0,
      creationDate: new Date()
    };
    this.selectProduct.emit(newProduct);
  }

  onDeleteProduct(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'name') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === 'date') {
      this.products.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
    }
  }
}
