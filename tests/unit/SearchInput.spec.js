import { render, screen } from '@testing-library/vue';
import BooksSearchInput from '../../src/components/SearchInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { books } from '@/store/dataSets';
import userEvent from '@testing-library/user-event';

const initialState = {
  search: {
    allBooks: books,
    booksSearchQuery: '',
    booksSearchResults: [],
  },
};

const setup = () => {
  const { container } = render(BooksSearchInput, {
    global: {
      plugins: [
        createTestingPinia({
          initialState,
          stubActions: false,
        }),
      ],
    },
  });

  return {
    container,
  };
};

test('should update the input field on change and autocomplete with relevant book', async () => {
  setup();
  const user = userEvent.setup();
  const textInput = screen.getByRole('textbox');

  expect(textInput.textContent).toBe('');

  await user.type(textInput, 'don');

  const updatedTextInput = screen.getByRole('textbox');
  const updatedAutoCompleteList = screen.getAllByRole('listitem');

  expect(updatedTextInput.value).toBe('don');
  expect(updatedAutoCompleteList.length).toBe(1);
  expect(updatedAutoCompleteList[0].textContent).toBe(
    'Title: Don Quixote Author: Miguel De Cervantes'
  );
});

test('should autocomplete the correct set of cities initially and then clear results if no matches are availeble', async () => {
  const expectedCities = [
    'san jose',
    'santiago',
    'san francisco',
    'santa rosa',
    'san juan',
  ];

  setup();
  const user = userEvent.setup();
  const textInput = screen.getByRole('textbox');

  expect(textInput.textContent).toBe('');

  await user.type(textInput, 'san');

  const updatedTextInput = screen.getByRole('textbox');
  const updatedAutoCompleteList = screen.getAllByRole('listitem');

  expect(updatedTextInput.value).toBe('san');
  expect(updatedAutoCompleteList.length).toBe(5);
  updatedAutoCompleteList.forEach((listItem) => {
    expect(expectedCities.some((city) => city === listItem.textContent))
      .toBeTruthy;
  });

  await user.type(textInput, 'ty');

  expect(screen.getByRole('textbox').value).toBe('santy');
  expect(screen.queryAllByRole('listitem')).toEqual([]);
});

test('should not return a list of cities or books if there is no match and should inform the user that no matches were found', async () => {
  setup();
  const user = userEvent.setup();
  const textInput = screen.getByRole('textbox');

  await user.type(textInput, 'pot');
  const noMatchedsearch = screen.getByText('No matches with your search');
  const citiesList = screen.queryByText('Cities');
  const books = screen.queryByText('Books');

  expect(noMatchedsearch).toBeTruthy();
  expect(citiesList).toBeFalsy();
  expect(books).toBeFalsy();
});
