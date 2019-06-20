import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { HttpService } from '../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  status: string[] = ['Active', 'Inactive'];

  form: FormGroup;

  product: Product = new Product();

  logedUser: User;

  constructor(private httpservice: HttpService, private route: Router) {
    this.httpservice.getLogedUser().subscribe(user => this.logedUser = user);
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  onSubmit(product: Product, logedUser: User) {
    this.httpservice.postProducts(product, logedUser).subscribe((data) => {
      if (data) {
        alert('Product Add Products List');
        this.route.navigate(['product-list']);
      }
    });
  }
}
