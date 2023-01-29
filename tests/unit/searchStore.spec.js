import { setActivePinia, createPinia } from 'pinia';
import { useSearchStore } from '../../src/store/useSearchStore';

const storeSetup = () => {
  setActivePinia(createPinia());
}

test('if search string is less than 3 letters it sets book results to be empty', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateBookSearchResults('sa');
  expect(searchStore.bookSearchResults).toEqual([]);
});

test('if search is 3 or more letters and it matches with a book title it should update search results', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateBookSearchResults('don');
  expect(searchStore.bookSearchResults).toEqual([{
    title: 'Don Quixote',
    author: 'Miguel De Cervantes',
  }]);
})

test('if search is 3 or more letters and there are no matches with a book title it should return and empty string', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateBookSearchResults('polt');
  expect(searchStore.bookSearchResults).toEqual([]);
})

test('if search string is less than 3 letters it sets city results to be empty', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateCitiesSearchResults('sa');
  expect(searchStore.citiesSearchResults).toEqual([]);
});

test('if search is 3 or more letters and it matches with cities it should update search results', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateCitiesSearchResults('san');
  expect(searchStore.citiesSearchResults).toEqual([
    "san jose",
    "santiago",
    "san francisco",
    "santa rosa",
    "san juan",
  ]);
})

test('if search is 3 or more letters and there are no matches with a city title it should return and empty string', () => {
  storeSetup();
  const searchStore = useSearchStore();
  searchStore.updateCitiesSearchResults('polt');
  expect(searchStore.citiesSearchResults).toEqual([]);
})