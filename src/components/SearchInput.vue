<template>
  <div class="search-container">
    <input
      autofocus
      id="books-search-query"
      class="search-box"
      type="text"
      :value="searchQuery"
      @input="onSearchQueryChange"
      placeholder="Enter 3 letters to see search results"
    />
    <div class="auto-complete">
      <ul v-if="booksSearchStore.getBooksSearchResults.value.length !== 0">
        <h4>Books</h4>
        <li
          v-for="book in booksSearchStore.getBooksSearchResults.value"
          :key="book"
        >
          <p><b>Title:</b> {{ book.title }} <b>Author:</b> {{ book.author }}</p>
        </li>
      </ul>
      <ul v-if="citiesSearchStore.getCitiesSearchResults.value.length !== 0">
        <h4>Cities</h4>
        <li
          v-for="city in citiesSearchStore.getCitiesSearchResults.value"
          :key="city"
        >
          <p>{{ city }}</p>
        </li>
      </ul>
      <ul
        v-else-if="
          searchQuery.length >= 3 &&
          citiesSearchStore.getCitiesSearchResults.value.length === 0 &&
          booksSearchStore.getBooksSearchResults.value.length === 0
        "
      >
        <h4>No matches with your search</h4>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBooksSearchStore } from '../store/useBooksSearchStore';
import { useCitiesSearchStore } from '../store/useCitiesSearchStore';

const searchQuery = ref('');

const booksSearchStore = useBooksSearchStore();
const citiesSearchStore = useCitiesSearchStore();

function onSearchQueryChange(event) {
  searchQuery.value = event.target.value;
  booksSearchStore.updateBookSearchResults(event.target.value);
  citiesSearchStore.updateCitiesSearchResults(event.target.value);
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

.search-container {
  position: relative;
  display: flex;
  width: 75%;
  margin: auto;
}

input.search-box {
  border: 1px solid white;
  padding: 9px 4px 9px 4px;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg');
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: 10px center;
  width: 100%;
}

input[type='text'] {
  background-color: white;
  border: none;
  margin: 0;
  padding: 7px 8px 7px 30px;
  font-size: 16px;
  color: inherit;
  border: 1px solid black;
  border-radius: inherit;
}

input[type='text']::placeholder {
  color: gray;
}

input[type='text']:focus {
  box-shadow: 0 0 3px 0 #3f69a8;
  border-color: #3f69a8;
  outline: none;
}

.auto-complete {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  text-align: left;
}
</style>
