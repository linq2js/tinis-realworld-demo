import {state} from 'tinis';

export const KeywordState = state('', {
  debounce: 400,
});

export const SearchResultsState = state(
  async () => {
    const keyword = KeywordState.value;
    if (!keyword) {
      return [];
    }

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        keyword,
      )}&sort=stars&order=desc`,
    ).then((res) => res.json());
    if (typeof response.message === 'string') {
      throw new Error(response.message);
    }
    return response.items;
  },
  {
    default: [],
  },
);
