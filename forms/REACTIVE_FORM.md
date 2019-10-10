# Reactive form

Great! You've just finished implementing template-driven form! Let's move to second approach which is reactive forms.

We may try to implement the same todo item form using another solution but to fully experience power of reactive forms you will create another, independent and more complex form for gathering basic user info.

Let's start by creating new component. In tutorial we will name it `user-info` but feel free to name it whatever you want.

Now we are ready to start implementing reactive form.
First step is to import `ReactiveFormsModule` in main app module.

To build form control in reactive form you have to use `FormControl` class. Usage is really simple - just create new instance of this class.

```typescript
firstName = new FormControl('initial state');
```
Initial state may be empty.

 You also need to register this control in your template as you needed to define `[(ngModel)]` in template-driven form.
 
```html
<input type="text" matInput [formControl]="firstName" required>
```

But what if you want more than one form control?
You may add them and group inside `FormGroup`!

```ts
userFormGroup = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  hobby: new FormControl(''),
  bestFriendName: new FormControl(''),
  dateOfBirth: new FormControl(''),
});
```

Now inside form in HTML you may register both FormGroup and all the FormControls. [help](https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance).

Once it's ready we may start playing with it.
Make sure that each input has proper `type`.

You may mark some of inputs as required but the simple html directive is not enough. To properly handle form validation each `FormControl` should define validation rules. Read through the [guide](https://angular.io/guide/form-validation) and appropriate rules.

To indicate the form validation state add submit button that would be disabled if form is invalid (`[disabled]="userFormGroup.invalid"`).

Try to play a bit with validators, for instance you can add pattern validator accepting only values from limited word range. Pattern validation may take [regular expression](https://en.wikipedia.org/wiki/Regular_expression) as an argument and [here](https://regex101.com/) you may find some useful tool while writing your RegExp.

## Something familiar

**Submitting** the form works exactly like in template-driven forms if it comes to HTML part.

For saving data from form this time we won't be using any service. Just to simply play with reactive forms you may store it inside class property named `gatheredUserInfo`. We encourage you to create also new type that will reflect structure of data in the form (new interface may be defined in the same `.ts` file - above or below component class declaration).

Check what are the methods and properties of `FormGroup` and find one which will allow you to get raw data from form and save it inside a variable. Use it inside `onSubmit()` method. Try to ask for help only if necessary.

**Displaying the data** gathered from form is also really simple - since it is stored as property you may easily access it in your HTML.
You may create for example something like that:

```html
  <p>Name: {{ gatheredUserInfo.firstName }}</p>
```

Everything is displayed as expected?
Great, now we may move on.

## Something new

`FormGroup` comes with very powerful methods like for example `setValue` and `patchValue` but you've probably already seen those when looking for `getRawValue`. To see one of those in action, please: 

1. Add in the class few properties that you would like to use as default values in your form.
2. Add button which will call `fillDefault` function.
3. Prepare logic inside that function which will patch default values into your form.
4. Try to always use documentation - it is crucial for you to learn how to use it.

Everything is working?
Now you may play with Angular Material.
Add [MatFormFields](https://material.angular.io/components/form-field/overview) and [Material Buttons](https://material.angular.io/components/button/overview) into existing template.

All done?
Let's move to another "game" with form.
To `onSubmit` function add disabling form.
Now for each element which is displaing gathered info add button which will trigger editing function. We've done it like this:

```html
  <p>Name: {{ gatheredUserInfo.firstName }}
    <button
      mat-icon-button
      (click)="editField('firstName')">
      <mat-icon>edit</mat-icon>
    </button>
  </p>
```

You may see that we've put button with `editField(fieldName)` function on click. 
We provide field name as a string, but if you want to do it with element reference feel free to try it :)

Our edit function works in a simple way - it is enabling control which is responsible for gathering this one specific information - so in the example above when we click on the edit button next to displayed name we will enable `firstName` field inside `userFormGroup`.
Do you know what will be inside `editField` function?
I bet you've told `this.userInfoGroup.controls[fieldName].enable();`.

Since you've had more freedom this time with coding your solutions on [StackBlitz](https://stackblitz.com/github/ng-girls/todo-list-tutorial/tree/master/examples/4_02-reactive-form) there is only an example of how it may be done.

Please discuss with your mentor anything that is coming to your mind right now.






