import React from 'react';
import TodoApp from 'todo';
import RedditApp from 'reddit';
import TimerApp from 'timer';
import GithubSearchApp from 'github-search';
import './App.css';

function App() {
  return (
    <div className="App">
      <GithubSearchApp />
      <TimerApp />
      <TodoApp />
      <RedditApp />
    </div>
  );
}

export default App;
