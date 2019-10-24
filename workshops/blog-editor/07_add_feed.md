

# Add a BlogCardComponent
Run the command shown below to create the blog card component.

    ng g c components/blog-card

Open [`src/app/components/blog-card.component.ts`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.ts#L2-L3) and add the following imports

    import { BlogService } from 'src/app/services/blog.service';
    import { Post } from 'src/app/models/post';

Inject the Blog Service in the constructor of `BlogCardComponent` class as shown below.

    constructor(private blogService: BlogService) { }

Add a property to hold the current blog post.

    blogPost: Post[] = [];

Now we will create a method to get the blog post and invoke it inside `ngOnInit` in [`src/app/components/blog-card.component.ts`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.ts#L16-L24) file.

    ngOnInit() {
      this.getBlogPosts();
    }

    getBlogPosts() {
      this.blogService.getAllPosts().subscribe(result => {
        this.blogPost = result;
      });
    }

Open `src/app/components/blog-card.component.html` and replace what is there with the HTML shown at [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.html](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.html)

Open `src/app/components/blog-card/blog-card.component.scss` and replace what is there with the style definitions shown at [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.scss](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/blog-card/blog-card.component.scss)


# Add the BlogCardComponent to the home page

We will display the blog card on home page. Open [`src/app/components/home.component.html`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/home/home.component.html#L1-L5) and replace what is there with the following HTML.

    <div class="row left-panel">
        <div class="col-md-9">
            <app-blog-card></app-blog-card>
        </div>
    </div>

Open [`src/app/components/home/home.component.scss`](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/components/home/home.component.scss#L1-L3) and add the following style definition inside it.

    .left-panel {
    	margin-top: 15px;
    }