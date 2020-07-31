import { useValue } from "react-tinis";
import React, { Suspense, useState } from "react";
import { RedditPostsState } from "./states";
import { RefreshRedditPosts } from "./effects";

const subreddits = ["reactjs", "frontend"];
const Loading = <p>Loading...</p>;

export default function () {
  const [subreddit, setSubreddit] = useState(subreddits[0]);

  return (
    <>
      <h1>Reddit App</h1>
      <div>
        <Picker options={subreddits} onChange={setSubreddit} />{" "}
        <button onClick={() => RefreshRedditPosts({ subreddit })}>
          Refresh
        </button>
      </div>
      <p />
      <Suspense fallback={Loading}>
        <Posts subreddit={subreddit} />
      </Suspense>
    </>
  );
}

function Posts({ subreddit }) {
  const { receivedAt, posts } = useValue(RedditPostsState(subreddit));

  return (
    <>
      <p>Last updated at: {receivedAt.toISOString()}</p>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>{post.title || ""}</li>
        ))}
      </ul>
    </>
  );
}

const Picker = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </span>
);
