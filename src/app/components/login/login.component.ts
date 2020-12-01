import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { PersonalFinanceService } from '../../service/personal-finance.service';
import { RegisterNewUserComponent } from '../register-new-user/register-new-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private personalFinanceService: PersonalFinanceService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }

  //This method will call the component wich will have Okta Auth Guard --. Redirect To Okta and navigate to dashboard
  //For now, directlt navigating to dashboard
  verifyOkta() {
    this.router.navigate(['../dashboard'], { relativeTo: this.route });
  }

  //Open the dialog to register
  openRegisterDialog() {
    let dialogRef = this.dialog.open(RegisterNewUserComponent);

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.notifier.notify("success", "Details sent to Dev Team!");

          this.personalFinanceService.registerNewUser(res).subscribe(
            res=>{
              if(res && res['status'] == "Success"){
                this.notifier.notify("success","Please check your mail!");
              }
              else{
                this.notifier.notify("error","Issue in sending mails!");
              }
            },err=>{
              this.notifier.notify("error","Issue with provided details!");
            }
          )
        }
      }
    )
  }

}
