import { setActivePinia, createPinia } from 'pinia';
import { useBooksSearchStore } from '../../src/store/useBooksSearchStore';

const storeSetup = () => {
  setActivePinia(createPinia());
};

test('if search string is less than 3 letters it sets book results to be empty', () => {
  storeSetup();
  const searchStore = useBooksSearchStore();
  searchStore.updateBookSearchResults('do');
  expect(searchStore.booksSearchResults).toEqual([]);
});

test('if search is 3 or more letters and it matches with a book title it should update search results', () => {
  storeSetup();
  const searchStore = useBooksSearchStore();
  searchStore.updateBookSearchResults('don');
  expect(searchStore.booksSearchResults).toEqual([
    {
      title: 'Don Quixote',
      author: 'Miguel De Cervantes',
    },
  ]);
});

test('if search is 3 or more letters and there are no matches with a book title it should return and empty string', () => {
  storeSetup();
  const searchStore = useBooksSearchStore();
  searchStore.updateBookSearchResults('polt');
  expect(searchStore.booksSearchResults).toEqual([]);
});
