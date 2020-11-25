import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  //This method will call the component wich will have Okta Auth Guard --. Redirect To Okta and navigate to dashboard
  //For now, directlt navigating to dashboard
  verifyOkta() {
    this.router.navigate(['../dashboard'], { relativeTo: this.route });
  }

}
