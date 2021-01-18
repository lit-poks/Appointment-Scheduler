import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType:string;

  constructor(private route:ActivatedRoute,private router:Router,private store:Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.userType=data.userType
    })
  }
 
  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  onClickBrand(){
    if(this.userType=='admin'){
      this.router.navigate(['/admin'])
    }
    else{
      this.router.navigate(['/users'])
    }
  }

  
}
