import { defineStore } from 'pinia'; 
import { ref } from 'vue';
import { books, cities } from './dataSets';


export const useSearchStore = defineStore('search', () => {
  const allBooks = ref(books);
  const allCities = ref(cities);
  const bookSearchResults = ref([]);
  const citiesSearchResults = ref([]);

  function updateBookSearchResults (searchString) {
    if (searchString.length < 3) {
      bookSearchResults.value = []
      return;
    }
    const availableBooks = allBooks.value.filter(book => {
      const regex = new RegExp(`^${searchString}(\\s|\\S)(.*)`, "i")
      return book.title.match(regex);
    })
    bookSearchResults.value = availableBooks;
  }

  function updateCitiesSearchResults (searchString) {
    if (searchString.length < 3) {
      citiesSearchResults.value = []
      return;
    }
    const availableCities = allCities.value.filter(city => {
      const regex = new RegExp(`^${searchString}(\\s|\\S)(.*)`, "i")
      return city.match(regex);
    })

    citiesSearchResults.value = availableCities;
  }

  return {
    bookSearchResults,
    citiesSearchResults,
    updateBookSearchResults,
    updateCitiesSearchResults
  }

})