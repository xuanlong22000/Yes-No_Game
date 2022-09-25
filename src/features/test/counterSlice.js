import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiController from '../../api/apiController';
export const getAnswer = createAsyncThunk(
  'answer/getAnswer',
  async () => {
    const res = await apiController.getAnswer()
    return res
  }
)
const initialState = {
  players: [],
  idInitPlayer: 1,
  indexQuestion: 0,
  questions: {
    matchId: 1,
    quest: 'alo alo alo',
  },
  questions2: [{
    matchId: 1,
    quest: 'alo alo alo',

  },
  {
    matchId: 2,
    quest: 'hihihihihihi',

  },
  {
    matchId: 3,
    quest: 'hahahahaha',

  },
  {
    matchId: 4,
    quest: 'lelelelelelele',

  }],
  result: []
};

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getPlayer: (state, action) => {
      state.players = action.payload
    },
    icreIdPlayer: (state, action) => {
      state.idInitPlayer += 1
    },
    savePlayer: (state, action) => {
      state.players.push(action.payload)
    },
    saveResult: (state, action) => {
      state.result.push(action.payload)
    },
    increIndexQuestion: (state, action) => {
      state.indexQuestion += 1
    },
    correctScore: (state, action) => {
      state.result[state.indexQuestion].score += 1
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
      .addCase(getAnswer.fulfilled, (state, action) => {
        state.questions2[state.indexQuestion].answer = action.payload.answer
      })
  },
});

export const { savePlayer, getPlayer, saveResult, increIndexQuestion, correctScore, icreIdPlayer } = counterSlice.actions;

export const selectCount = (state) => state.counter.players;
export const questions = (state) => state.counter.questions;
export const questions2 = (state) => state.counter.questions2;
export const result = (state) => state.counter.result;
export const currentQuestion = (state) => state.counter.currentQuestion;
export const indexQuestion = (state) => state.counter.indexQuestion;
export const idInitPlayer = (state) => state.counter.idInitPlayer;

export default counterSlice.reducer;
