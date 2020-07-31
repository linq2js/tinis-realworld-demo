import { effect } from "tinis";
import { RedditPostsState } from "./states";

export const RefreshRedditPosts = effect((payload) => {
  const { subreddit } = payload;

  RedditPostsState(subreddit).reset();
});
