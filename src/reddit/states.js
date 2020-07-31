import { state } from "tinis";

export const RedditPostsState = state.family(async (subreddit) => {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json`
  ).then((response) => response.json());

  return {
    receivedAt: new Date(),
    posts: response.data.children.map((item) => item.data),
  };
});
