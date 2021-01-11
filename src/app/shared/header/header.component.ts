import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType:string;

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.userType=data.userType
    })
  }

  
}
