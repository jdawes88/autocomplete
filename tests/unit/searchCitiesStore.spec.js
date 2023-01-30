import { setActivePinia, createPinia } from 'pinia';
import { useCitiesSearchStore } from '../../src/store/useCitiesSearchStore';

const storeSetup = () => {
  setActivePinia(createPinia());
}

test('if search string is less than 3 letters it sets city results to be empty', () => {
  storeSetup();
  const searchStore = useCitiesSearchStore();
  searchStore.updateCitiesSearchResults('sa');
  expect(searchStore.citiesSearchResults).toEqual([]);
});

test('if search is 3 or more letters and it matches with cities it should update search results', () => {
  storeSetup();
  const searchStore = useCitiesSearchStore();
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
  const searchStore = useCitiesSearchStore();
  searchStore.updateCitiesSearchResults('polt');
  expect(searchStore.citiesSearchResults).toEqual([]);
})