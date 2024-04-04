import { createStore } from 'redux';
import { rootReducer } from './components/root';
// src/store.ts
// import { configureStore } from '@reduxjs/toolkit';

// interface Article {
//   id: number;
//   title: string;
//   url: string;
// }

// interface Collection {
//   id: number;
//   name: string;
//   articles: number[]; // 存储文章ID的数组
// }

// interface AppState {
//   articles: Article[];
//   collections: Collection[];
// }

// const initAppState: AppState = {
//   articles: [],
//   collections: [],
// };

const store = createStore(
  rootReducer
);

export type AppDispatch = typeof store.dispatch;
export default store;
