# Form builder

Sometimes creating form control instances manually may become uncomfortable - with help comes the `FormBuilder`.

For using [FormBuilder](https://angular.io/guide/reactive-forms#generating-form-controls-with-formbuilder) you need to define it in constructor of your class. Let's refactor existing reactive form.

As you may see in the example in link above with `FormBuilder` service you don't need no longer to create each time new instance of `FormGroup` and `FormControl` - it will take care of it for you!

Refactoring should go smoothly, but if you'll have and problems - ask your mentor for help.

# FormArray

Imagine that you would like to also add to form control for skills, but instead of providing long text in one input separate it into different inputs. From where you need to take number of inputs? Well, you may start with one and add next one on the go!
With help comes `FormArray`
> FormArray is an alternative to FormGroup for managing any number of unnamed controls.

So if you want to add skills form controls, your `FormBuilder` needs to handle it.

It will be enough if you'll add 
```typescript
this.formBuilder.array([
      this.formBuilder.control('')
    ])
```
as `skills` form control.
Adding new form control may be handled by button `Add skill` which should trigger `addSkills` method defined in the class.

This method in turn should push new form control into existing array of controls.
It needs to know where to look for this array - you may create a skills [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) which will return `skills` marked `as FormArray`.
Now when we have reference to skills in `FormGroup` we know where we should push new form control.

```ts
  get skills() {
    return this.userInfoGroup.get('skills') as FormArray;
  }

  addSkills() {
    this.skills.push(this.formBuilder.control(''));
  }
```

Update user information type and view of gathered info so you could see skills you are adding.

In the end your code should look more or less like this on on [StackBlitz](https://stackblitz.com/github/pelagia123/todo-list-tutorial/tree/form-builder/examples/4_03-form-builder?file=src%2Fapp%2Fuser-info%2Fuser-info.component.ts)


If you've finished everything and still you want to do something you may create more forms or start looking at unit tests.
Writing tests may actually teach you a lot about what and how you are coding.
