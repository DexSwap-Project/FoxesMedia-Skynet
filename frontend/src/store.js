import { createStore } from 'easy-peasy'; 
import Model from "./reducers";

const store = createStore(Model);

export default store;