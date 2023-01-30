import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { cities } from './dataSets';

export const useCitiesSearchStore = defineStore('citiesSearch', () => {
  const allCities = ref(cities);
  const citiesSearchResults = ref([]);
  const getCitiesSearchResults = computed(() => citiesSearchResults);

  function updateCitiesSearchResults(searchQuery) {
    if (searchQuery.length < 3) {
      citiesSearchResults.value = [];
      return;
    }
    const citiesResults = allCities.value.filter((city) => {
      const regex = new RegExp(`^${searchQuery}(\\s|\\S|.*)(.*)`, 'ig');
      return city.match(regex);
    });
    citiesSearchResults.value = citiesResults;
  }

  return {
    updateCitiesSearchResults,
    citiesSearchResults,
    getCitiesSearchResults,
  };
});
