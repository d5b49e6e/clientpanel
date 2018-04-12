import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showregister:boolean;

  constructor(
    private as:AuthService,
    private router:Router,
    private fs:FlashMessagesService,
    public settingsService:SettingsService
  
  ) { }

  ngOnInit() {
    this.as.getAuth().subscribe( auth => {
      if(auth){
        this.loggedInUser = auth.email;
      }
      this.isLoggedIn = auth!=null;
        
    });
    this.showregister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.as.logout();
    this.fs.show('You are logged out',{cssClass:'alert-success',timeout:4000});
    this.router.navigate(['/login']);
  }

}
