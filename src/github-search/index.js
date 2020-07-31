import React, {Suspense} from 'react';
import {ErrorBoundary, useValue} from 'react-tinis';
import {Search} from './effects';
import {KeywordState, SearchResultsState} from './states';

export default function () {
  return (
    <>
      <h1>Github Search App</h1>
      <SearchTerm />
      <Suspense fallback="Searching...">
        <ErrorBoundary fallbackRender={(e) => e.message}>
          <SearchResults />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

function SearchTerm() {
  const keyword = useValue(KeywordState);
  return (
    <form>
      <input
        type="text"
        onChange={(e) => Search(e.target.value)}
        value={keyword}
        placeholder="Enter github username"
      />
    </form>
  );
}

function SearchResults() {
  const repos = useValue(SearchResultsState);

  return (
    <ul>
      {repos.map((repo) => (
        <li>{repo.name}</li>
      ))}
    </ul>
  );
}
