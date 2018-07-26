import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  showReleaseNotes = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onChangeTheme() {
    this.userService.themeFlag = !this.userService.themeFlag;
    const cnt = document.getElementsByClassName('cnt');
    const cnt_2 = document.getElementsByClassName('cnt2');
    if (this.userService.themeFlag) {
      document.body.style.backgroundColor = 'darkslategrey';
      for (let i = 0; i < cnt.length; i++) {
        (<HTMLElement>cnt[i]).style.backgroundColor = 'lightslategrey';
      }
      for (let i = 0; i < cnt_2.length; i++) {
        (<HTMLElement>cnt_2[i]).style.setProperty('background-color', 'rgb(167, 187, 209)', 'important');
        (<HTMLElement>cnt_2[i]).style.setProperty('color', 'white', 'important');
      }
    } else {
      document.body.style.backgroundColor = '';
      for (let i = 0; i < cnt.length; i++) {
        (<HTMLElement>cnt[i]).style.backgroundColor = '';
      }
      for (let i = 0; i < cnt_2.length; i++) {
        (<HTMLElement>cnt_2[i]).style.setProperty('background-color', '');
        (<HTMLElement>cnt_2[i]).style.setProperty('color', '');
      }
    }
  }

}
