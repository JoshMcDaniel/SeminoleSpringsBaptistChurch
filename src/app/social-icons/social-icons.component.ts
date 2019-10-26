import { take } from 'rxjs/operators';
import { SocialIcon, SocialIconArray } from './social-icons.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss']
})
export class SocialIconsComponent implements OnInit {

  readonly iconsURL = '../assets/images/social/icons.json'
  socialIcons: SocialIcon[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.iconsURL).pipe(take(1))
      .subscribe((icons: SocialIconArray) => {
        this.socialIcons = icons.socialIcons;
      })
  }

}
