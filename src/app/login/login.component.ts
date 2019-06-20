import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  charsCount = 6;

  form: FormGroup;

  user: User = new User();

  constructor(private httpservice: HttpService, private route: Router) {}


  ngOnInit () {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.checkPassLength.bind(this)]),

    });
  }


  onSubmit (user: User) {
    this.httpservice.postDataLog(user).subscribe((data) => {
      console.log(data);
      if (data === 'User found' ) {
       this.route.navigate(['user-page']);
      } else {
        alert('User not Found');
      }
    });

  }

  checkPassLength (control: FormControl) {
    if (control.value.length > 0 && control.value.length < this.charsCount) {
      return {passError: true};
    }
    return null;
  }
}


