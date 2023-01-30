import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { books } from './dataSets';

export const useBooksSearchStore = defineStore('bookSearch', () => {
  const allBooks = ref(books);
  const booksSearchResults = ref([]);
  const getBooksSearchResults = computed(() => booksSearchResults);

  function updateBookSearchResults(searchQuery) {
    if (searchQuery.length < 3) {
      booksSearchResults.value = [];
      return;
    }
    const bookResults = allBooks.value.filter((book) => {
      const regex = new RegExp(`^${searchQuery}(\\s|\\S|.*)(.*)`, 'ig');
      return book.title.match(regex);
    });
    booksSearchResults.value = bookResults;
  }

  return {
    updateBookSearchResults,
    booksSearchResults,
    getBooksSearchResults,
  };
});
