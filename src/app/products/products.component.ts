import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product, selectedProduct } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [HttpService]
})
export class ProductsComponent implements OnInit {

  status: string[] = ['All', 'Active', 'Inactive'];

  stat: string;

  productList: Product[] = [];

  statusConditions: boolean[] = [];
  // selectval;

  constructor(private httpservice: HttpService, private route: Router) {
   setTimeout(() => {
     this.setConditons();
   }, 0);
   }

  ngOnInit() {
    this.httpservice.getProducts().subscribe((data) => {
      this.productList = data;
      console.log(this.productList);
    });
  }

  edit(myproduct: Product) {
    selectedProduct.selectId = myproduct.id;
    this.route.navigate(['update']);
  }

  delete(product: Product) {
    console.log(product.id);
    this.httpservice.del(product).subscribe(() => {
      this.httpservice.getProducts().subscribe(data1 => {
        this.productList = data1;
        setTimeout(()=> {
          this.setConditons();
        },0)
      });
    });
   }

   setConditons() {
     if (this.productList) {
      this.statusConditions = [];
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].status === 'Active') {
          this.statusConditions.push(true);
        } else {
          this.statusConditions.push(false);
        }
      }
      console.log(this.statusConditions);
     }
     
   }

  //  onChange(sel) {
  //    console.log(sel);
  //  }

}
