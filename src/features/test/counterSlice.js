import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  players: [],
  questions: {
    matchId: 1,
    quest: 'alo alo alo',
    answer: 1
  },
  questions2: [{
    matchId: 1,
    quest: 'alo alo alo',
    answer: 1
  },
  {
    matchId: 2,
    quest: 'hihihihihihi',
    answer: 2
  },
  {
    matchId: 3,
    quest: 'hahahahaha',
    answer: 1
  },
  {
    matchId: 4,
    quest: 'lelelelelelele',
    answer: 2
  }],
  currentQuestion: [],
  result: []
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getPlayer: (state, action) => {
      state.players = action.payload
    },
    savePlayer: (state, action) => {
      state.players.push(action.payload)
    },
    saveResult: (state, action) => {
      state.result.push(action.payload)
    },
    saveCurrentQuestion: (state, action) => {
      state.currentQuestion.push(action.payload)
    }
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { savePlayer, getPlayer, saveResult, saveCurrentQuestion } = counterSlice.actions;

export const selectCount = (state) => state.counter.players;
export const questions = (state) => state.counter.questions;
export const questions2 = (state) => state.counter.questions2;
export const result = (state) => state.counter.result;
export const currentQuestion = (state) => state.counter.currentQuestion;

export default counterSlice.reducer;
