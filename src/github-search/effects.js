import {effect} from 'tinis';
import {KeywordState} from './states';

export const Search = effect((payload) => {
  KeywordState.mutate(payload);
});
