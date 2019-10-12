import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hobby: string;
  bestFriendName: string;
  dateOfBirth: Date;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  gatheredUserInfo: UserInfo;
  defaultName = 'Mariolka';
  defaultEmail = 'Example@email.pl';

  userInfoGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(kasia|mariolka|grażyna)$/i)
    ]),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.email),
    phone: new FormControl(''),
    hobby: new FormControl(''),
    bestFriendName: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  onSubmit() {
    console.log(this.userInfoGroup.getRawValue());
    this.userInfoGroup.disable();
    this.gatheredUserInfo = this.userInfoGroup.getRawValue();
  }

  editField(elementRef: string) {
    console.log(this.userInfoGroup.controls);
    this.userInfoGroup.controls[elementRef].enable();
  }

  fillDefault() {
    this.userInfoGroup.patchValue({
      firstName: this.defaultName,
      email: this.defaultEmail
    });
  }
}


