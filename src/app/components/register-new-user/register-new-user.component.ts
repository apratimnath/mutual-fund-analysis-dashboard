import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../models/user';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;

  //Second Tab
  secondaryEmail: string;
  secondaryMobile: string;
  country: FormControl = new FormControl();
  langPref: FormControl = new FormControl()

  countryOptions: string[] = ["India", "USA", "Canada", "United Kingdom", "Others"];
  languageOptions: string[] = ["English", "Hindi", "Kannada", "Telegu", "Bengali", "French", "Italian"];


  countryFilteredOptions: Observable<string[]>;
  languageFilteredOptions: Observable<string[]>;

  //The index of he tab
  selectedIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<RegisterNewUserComponent>,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.countryFilteredOptions = this.country.valueChanges.pipe(
      startWith(''),
      map(value => this.filterValue(value, 'country'))
    );

    this.languageFilteredOptions = this.langPref.valueChanges.pipe(
      startWith(''),
      map(value => this.filterValue(value, 'lang'))
    );
  }

  //Filter the value by case-insensitive matching for auto complete
  //TODO - Add debouncing
  private filterValue(value: string, type: string): string[] {
    const filterValue = value.toLowerCase();

    if (type == 'country')
      return this.countryOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    else
      return this.languageOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  //Close the dialog
  closeDialog() {
    this.dialogRef.close(undefined);
  }

  //Create the user object to send back to the login page
  createUserObject() {
    let emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let mobileRegex: RegExp = /[\d]{10}/g

    if (emailRegex.test(this.email) && mobileRegex.test(this.mobileNumber)) {
      let user: User = new User();

      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.email = this.email;
      user.mobileNumber = this.mobileNumber;
      user.country = this.country.value;
      user.langPref = this.langPref.value;
      user.secondaryEmail = this.secondaryEmail;
      user.secondaryMobile = this.secondaryMobile;

      this.notifier.notify("success", "Details captured successfully!");
      this.dialogRef.close(user);
    }
    else {
      this.notifier.notify("error", "Required formats do not match!");
    }

  }
}
