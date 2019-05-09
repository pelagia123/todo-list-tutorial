# Explore the element reference

Just like we did in the previous chapter, when we logged $event, you can do the same with `#inputElementRef`.

![lab-icon](.gitbook/assets/lab%20%283%29.jpg) **Playground:** Change the method `changeTitle` so it will receive the whole element reference and log it to the console:

{% code-tabs %}
{% code-tabs-item title="src/app/input-button-unit/input-button-unit.component.ts" %}
```markup
<input #inputElementRef
       [value]="title"              
       (keyup.enter)="changeTitle(inputElementRef)">

<button (click)="changeTitle(inputElementRef)">
  Save
</button>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

```typescript
changeTitle(inputElementReference) {
  console.log(inputElementReference);
  this.title = inputElementReference.value;
}
```

Don't forget to put the code back the way it was after you're finished experimenting! It's best to pass to a method exactly the value it needs, instead of the whole object.

## Resources

[Angular Template Reference Variables](https://angular.io/guide/template-syntax#template-reference-variables--var-)

