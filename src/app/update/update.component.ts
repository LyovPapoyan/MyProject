import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, selectedProduct } from '../product';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [HttpService]
})
export class UpdateComponent implements OnInit {

  selectedProductId = selectedProduct.selectId;

  form: FormGroup;

  product: Product = new Product();

  productList: Product;

  status: string[] = ['Active', 'Inactive'];



  constructor(private httpservice: HttpService, private route: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  onSubmit(myproduct: Product, selectedId) {
    console.log(selectedId);
    console.log(myproduct);
    this.httpservice.postUpdate(myproduct, selectedId).subscribe((data) => {
      
       alert('Product Update');
      console.log(data); 
     this.route.navigateByUrl('/product-list');
  });
}
}
