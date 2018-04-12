import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(
    public cs:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public fm:FlashMessagesService
  ) { }

  ngOnInit() {
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get client
    this.cs.getClient(this.id).subscribe( client => {
      this.client = client;
      this.hasBalance = client.balance > 0 ;
      console.log(this.client);
    });
  }

  updateBalance(id:string){
    this.id=id;
    this.cs.updateClient(this.id,this.client);
    this.fm.show('Balance Updated',{cssClass: 'alert-success',timeout:4000});
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
     this.cs.deleteClient(this.id);
     this.fm.show('Client Deleted',{cssClass: 'alert-success',timeout:4000});
     this.router.navigate(['/']);
    }
  }
}
