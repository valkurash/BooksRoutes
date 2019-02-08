import { StoreEnhancer, Action, Reducer, AnyAction } from 'redux';

const round = (num: number) => Math.round(num * 100) / 100;

const monitorReducerEnhancer: StoreEnhancer = createStore => (
  reducer: any,
  initialState: any
) => {
  const monitoredReducer = (state: any, action: any) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);

    console.log('reducer process time:', diff);

    return newState;
  };

  return createStore(monitoredReducer, initialState);
};

export default monitorReducerEnhancer;
