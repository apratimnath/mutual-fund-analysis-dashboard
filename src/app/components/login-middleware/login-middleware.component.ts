import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { NotifierService } from 'angular-notifier';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-middleware',
  templateUrl: './login-middleware.component.html',
  styleUrls: ['./login-middleware.component.css']
})
export class LoginMiddlewareComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private oktaAuth: OktaAuthService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // get authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        res => {
          let firstName: string = "User";
          let lastName: string = "";

          if (res.given_name) {
            firstName = res.given_name;
          }

          if (res.family_name) {
            lastName = res.family_name;
          }

          let currentUser: User = new User();

          currentUser.firstName = firstName;
          currentUser.lastName = lastName;
          currentUser.email = res.email;

          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

          this.router.navigate(["../dashboard"], { relativeTo: this.route });
        }
      ).catch(
        err=>{
          this.notifier.notify("error", "Unable to fetch user details!");
          this.router.navigate(['']);
        }
      );
    }
    else {
      this.notifier.notify("error", "Issue in logging in to Okta!");
      this.router.navigate(['']);
    }
  }

}
