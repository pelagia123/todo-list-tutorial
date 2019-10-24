# Add Angular Material packages


Import the Browser Animation Module into [`src/app/app.module.ts`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/app.module.ts#L5) file as shown below.

    import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
    
    @NgModule({
      ...
      imports: [
        ...
        BrowserAnimationsModule,
      ],
    })

Some features of Angular material require `HammerJS`.

Import it into [`src/main.ts`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/main.ts#L6). This file is the entry point of our app.

    import 'hammerjs';


# Add a material theme
We will add a built-in material theme globally by including the following line in [`src/styles.scss`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/styles.scss#L3) file.

    @import  "~@angular/material/prebuilt-themes/indigo-pink.css";


# Add a module for Angular material
We will create a new module to include all the material related components. Right click on the 📁```ng-material``` folder and create a module with the name ```ng-material```.

    ng g m ng-material

Open `src/app/ng-material/ng-material.module.ts` and replace what is there with the code in [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/ng-material/ng-material.module.ts](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/ng-material/ng-material.module.ts)

Import this new `NgMaterialModule` in [`src/app/app.module.ts`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/app.module.ts#L6) file as shown below.

    import { NgMaterialModule } from  './ng-material/ng-material.module';
    
    @NgModule({
      ...
      imports: [
        ...
        NgMaterialModule,
      ],
    })
