import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private as:AuthService,
    private router:Router,
    private fs:FlashMessagesService

  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.as.regiser(this.email,this.password)
      .then( (res) => {
        this.fs.show('New user registered',{cssClass: 'alert-success',timeout:4000});
        this.router.navigate(['/']);
      })
      .catch( (err) =>{
        this.fs.show(err.message,{cssClass: 'alert-danger',timeout:4000});
        this.router.navigate(['/register']);
      })
      ;
  }

}
