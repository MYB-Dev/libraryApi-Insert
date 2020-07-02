var app = new Vue({
  el: '#app',
  data: {
    title: '',
    author: '',
    isbn: '',
    loading: false,
    books: [],
  },
  methods: {
    submit(e) {
      const book = {
        title: this.title,
        author: this.author,
        isbn: this.isbn,
      };
      fetch('https://myb-library-api.herokuapp.com/api/books', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      })
        .then((response) => response.json())
        .then((createdBook) => {
          console.log('Success, new book is created:', createdBook);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .then(() => {
          this.loading = false;
        });

      this.title = '';
      this.author = '';
      this.isbn = '';
      this.loading = true;
      e.preventDefault();
    },
  },
  mounted: function () {
    fetch('https://myb-library-api.herokuapp.com/api/books')
      .then((response) => response.json())
      .then((data) => {
        this.books = data;
      });
  },
});
