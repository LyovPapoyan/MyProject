import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { User } from '../user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css'],
  providers: [HttpService]
})
export class RegComponent implements OnInit {



  charsCount = 6;
  form: FormGroup;

  user: User = new User();

  constructor (private httpService: HttpService, private route: Router) {}


  ngOnInit () {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.checkPassLength.bind(this)]),
    });

  }

  onSubmit (user: User) {
    this.httpService.postDataReg(user).subscribe(data => console.log(data));
    this.route.navigate(['login']);

  }

  checkPassLength (control: FormControl) {
    if (control.value.length > 0 && control.value.length < this.charsCount) {
      return {passError: true};
    }
    return null;
  }
}


