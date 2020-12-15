import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { PersonalFinanceService } from '../../service/personal-finance.service';
import { MutualFundService } from '../../service/mutual-fund.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Personal Finance Analysis Dashboard';

  //All the subscription for ng busy
  loadMutualFundActualChange: Subscription;

  //Mutual Fund Data Daily
  dailyMutualFundChange: number = 0;
  dailyMutualFundDate: string;

  growwDailyChange: number = 0;
  paytmDailyChange: number = 0;

  //Expenditure Daily Change
  dailyExpenditureChange: number = 0;

  constructor(
    private notifier: NotifierService,
    private mutualFundService: MutualFundService,
    private personalfinanceService: PersonalFinanceService
  ) { }

  ngOnInit(): void {
    this.loadMutualFundActualChange = this.mutualFundService.getInitialData().subscribe(
      res => {
        if (res.overall_list && res.overall_list.length == 1) {
          this.dailyMutualFundChange = res.overall_list[0].sum_difference;
          this.dailyMutualFundDate = res.overall_list[0].date;

          if (res.app_based_calculations && res.app_based_calculations.length == 2) {
            this.growwDailyChange = res.app_based_calculations.filter(eA => eA.app_name == "Groww")[0].sum_difference;
            this.paytmDailyChange = res.app_based_calculations.filter(eA => eA.app_name == "Paytm Money")[0].sum_difference;

            this.notifier.notify("success", "Latest data synced successfully!");
          }
          else {
            this.notifier.notify("error", "Unable to fetch app changes!");
          }
        }
        else {
          this.notifier.notify("error", "Unable to fetch daily changes!");
        }
      }
    )
  }

}
