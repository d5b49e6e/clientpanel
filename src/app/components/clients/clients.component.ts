import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";

import { Client } from "../../models/Client";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:any[];
  totalOwed:number;

  constructor(public clientSerice:ClientService) { 
    
  }

  ngOnInit() {
    

    this.clientSerice.getClients().subscribe( clients => {
      this.clients = clients;
      this.getTotaledOwed();
    });
  }

  getTotaledOwed(){
    let total = 0;
    for(let i=0;i<this.clients.length;i++){
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed = total;
    console.log(this.totalOwed);
  }

}
