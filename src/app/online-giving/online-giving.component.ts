import { Component } from '@angular/core';

@Component({
  selector: 'app-online-giving',
  templateUrl: './online-giving.component.html',
  styleUrls: ['./online-giving.component.scss']
})
export class OnlineGivingComponent {

  readonly ONLINE_GIVING_URL = 'https://tithe.ly/give?c=1397210';
  readonly TITHELY_URL = `https://get.tithe.ly/online-giving-for-churches?
  gclid=Cj0KCQjw6_vzBRCIARIsAOs54z6dHAswB1hGM03hGm3UfdV_r-KCX4-2X92OKgMEoYp-L6leGezgKBIaAnX8EALw_wcB`;

  constructor() { }

}
