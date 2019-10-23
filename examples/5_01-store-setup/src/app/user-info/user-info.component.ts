import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hobby: string;
  bestFriendName: string;
  dateOfBirth: Date;
  skills: string[];
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  gatheredUserInfo: UserInfo;
  defaultName = 'Mariolka';
  defaultEmail = 'example@email.pl';

  userInfoGroup = this.formBuilder.group({
    firstName: ['',
      [Validators.required,
      Validators.pattern(/^(kasia|mariolka|grażyna)$/i)]
    ],
    lastName: [''],
    email: ['', Validators.email],
    phone: [''],
    hobby: [''],
    bestFriendName: [''],
    dateOfBirth: [''],
    skills: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  constructor( private formBuilder: FormBuilder) {
  }

  onSubmit() {
    this.userInfoGroup.disable();
    this.gatheredUserInfo = this.userInfoGroup.getRawValue();
  }

  editField(elementRef: string) {
    this.userInfoGroup.controls[elementRef].enable();
  }

  fillDefault() {
    this.userInfoGroup.patchValue({
      firstName: this.defaultName,
      email: this.defaultEmail
    });
  }

  get skills() {
    return this.userInfoGroup.get('skills') as FormArray;
  }

  addSkills() {
    this.skills.push(this.formBuilder.control(''));
  }
}


