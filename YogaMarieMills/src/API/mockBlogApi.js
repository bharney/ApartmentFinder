function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (blog) => {
    return replaceAll(blog.name, ' ', '-');
};


class BlogApi {
    static getAllBlogs() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/blogs').then(function (response) {
                return response.json();
            }).then(function (blogs) {
                resolve(Object.assign([], blogs));
            });
        });
    }

    static saveBlog(blog) {
        blog = Object.assign({}, blog);
        return new Promise((resolve, reject) => {
            debugger;
            const minBlogTitleLength = 1;
            if (blog.title.length < minBlogTitleLength) {
                reject(`Name must be at least ${minBlogTitleLength} characters.`);
            }

            if (blog.id) {
                fetch('http://localhost:3000/api/blogs', {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(blog)
                }).then(function (response) {
                    return response.json();
                }).then(function (blog) {
                    resolve(blog)
                }).catch(function (error) {
                    console.log('Request failed', error);
                });
            } else {
                fetch('http://localhost:3000/api/blogs', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(blog)
                }).then(function (response) {
                    return response.json();
                }).then(function (blog) {
                    resolve(blog)
                }).catch(function (error) {
                    console.log('Request failed', error);
                });
            }
        });
    }

    static deleteBlog(blogId) {
        return new Promise((resolve, reject) => {
            const indexOfBlogToDelete = blogs.findIndex(blog => {
                blog.blogId == blogId;
            });
            blogs.splice(indexOfBlogToDelete, 1);
            resolve();
        });
    }
}

export default BlogApi;