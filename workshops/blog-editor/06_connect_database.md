
# Create custom pipes
We will add two custom pipes in our app

 - **Excerpt**:  which will show a summary of post in blog card.
 - **Slug**:  which will show the URL slug for a post.

We will create a a new pipe named ExcerptPipe. Right-click on the folder 📁```custompipes``` and then navigate to 'Angular Generator', select 'Pipe' and provide the name ‘excerpt.

Replace the `transform` method with the following, as shown at [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/custompipes/excerpt.pipe.ts#L5-L12](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/custompipes/excerpt.pipe.ts#L5-L12)

    transform(content: string) {
      const postSummary = content.replace(/(<([^>]+)>)/ig, '');
      if (postSummary.length > 300) {
        return postSummary.substr(0, 300) + ' [...]';
      } else {
        return postSummary;
      }
    }

Furthermor we create a slug pipe. Right-click on the folder 📁```custompipes``` and then navigate to 'Angular Generator', select 'Pipe' and provide the name ‘slug’.

Replace the `transform` method with the following, as shown at [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/custompipes/slug.pipe.ts#L5-L8](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/custompipes/slug.pipe.ts#L5-L8)

    transform(title: string) {
      const urlSlug = title.trim().toLowerCase().replace(/ /g, '-');
      return urlSlug;
    }


# Get the blogs from database
We will add the `getAllPosts` method in `src/app/services/blog.service.ts` file to fetch all the blog posts from database. The definition for `getAllPosts` is shown at [https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/services/blog.service.ts#L19-L29](https://github.com/AnkitSharma-007/blogsite/blob/master/src/app/services/blog.service.ts#L19-L29)

    getAllPosts(): Observable<any> {
      const blogs = this.db.collection('blogs', ref => ref.orderBy('createdDate', 'desc')).snapshotChanges().pipe(
        map(actions => {
          return actions.map(
            c => ({
              postId: c.payload.doc.id,
              ...c.payload.doc.data()
            }));
        }));
      return blogs;
    }
