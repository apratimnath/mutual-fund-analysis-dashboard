import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //This will logout of Okta and redirect to the login screen
  //For now it is only redirecting to the login screen
  logOut() {
    this.router.navigate(['']);
  }

}
