import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  requests: Array<any>;
  errorMsg: string;
  constructor(
    private _router:Router,
    private _userService:UserService
  ) {
    this._userService.user().subscribe(
      data => {
        console.log(data);
        this._userService.setLogin(true);
      },
      error => { console.log(error);
        this._userService.setLogin(false);
        this._router.navigate(['/login']); }
    );

    this._userService.requests().subscribe(data => {
      this.requests = data as Array<any>;
      console.log(this.requests);
    },
    err => { this.errorMsg = err;})
   }

  ngOnInit() {
  }

  prihvati(username: string) {
    console.log(username);
    this._userService.confirm(username).subscribe(
      data => { 
        this._userService.requests().subscribe(data => {
        this.requests = data as Array<any>;
        console.log(this.requests);
      });
     console.log(data);},
      error => {console.log(error);}
    );
  }

  odbaci(username: string) {}

}
