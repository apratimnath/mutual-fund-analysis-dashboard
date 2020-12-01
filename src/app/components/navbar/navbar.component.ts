import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private oktaAuth: OktaAuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  }

  //This will logout of Okta and redirect to the login screen
  //For now it is only redirecting to the login screen
  logOut() {
    this.oktaAuth.signOut();
  }

}
