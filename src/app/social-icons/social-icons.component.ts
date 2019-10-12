import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss']
})
export class SocialIconsComponent implements OnInit {

  socialIcons = [
    {
      socialLinks: '',
      imageLink: './assets/images/social/facebook_icon.png'
    },
    {
      socialLinks: '',
      imageLink: './assets/images/social/twitter_icon.png'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
