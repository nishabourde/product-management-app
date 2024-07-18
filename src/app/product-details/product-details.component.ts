import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  @Input() product: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.product = { ...this.product };
    }
  }

  onSaveProduct(): void {
    if (this.product) {
      if (this.productService.getProductById(this.product.id)) {
        this.productService.updateProduct(this.product);
      } else {
        this.productService.addProduct(this.product);
      }
      this.product = null;
    }
  }

  isValid(): boolean {
    return !!this.product && this.product.name.trim().length > 0 && this.product.price > 0;
  }  
}
