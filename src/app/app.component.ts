import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private httpService: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.httpService.get("./assets/config.json").subscribe(res => {
      sessionStorage.setItem("backendBaseURL", res['backendBaseURL']);
    })
  }

}
