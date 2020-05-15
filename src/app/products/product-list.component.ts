import {Component, OnInit } from '@angular/core'
import { IProduct } from './product'
import { ProductService } from './product.service';

@Component ({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    private _productService;
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage:boolean = false;
    _listFilter : string;
    errorMessage: string;
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products;
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    filteredProducts: IProduct[] ;

    constructor(private productService: ProductService){
        this._productService = productService; 
    }

    
    products: IProduct[] = [
        {
            "productId" : 2,
            "productName" : "Garden Cart",
            "productCode" : "GDN-0023",
            "releaseDate" : "March 18, 2019",
            "description" : "The best item ",
            "price" : 32.99,
            "starRating" : 4.2,
            "imageUrl" : "assets/images/garden_cart.png"
        },
        {
            "productId" : 5,
            "productName" : "Hammer",
            "productCode" : "TBX-0048",
            "releaseDate" : "May 21, 2019",
            "description" : "The best item 2",
            "price" : 8.9,
            "starRating" : 4.8,
            "imageUrl" : "assets/images/hammer.png"
        }
    ];

    toggleImage (): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}