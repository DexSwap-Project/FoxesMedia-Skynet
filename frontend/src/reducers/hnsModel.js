import { action, thunkOn } from 'easy-peasy';

 const hnsModel = {
  // Todo State
  loading: false,
  hnsEntries: [],

  // Todo Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),
  addEntry: action((state, { hnsName, dataLink, entryLink }) => {
    state.hnsEntries.push({ hnsName, dataLink, entryLink });
  }),
  deleteEntry: action((state, payload) => {
    state.hnsEntries.splice(payload.i, 1);
  }),
  updateEntry: action((state, payload) => {
    state.hnsEntries[payload.i].done = payload.elem.checked;
  }),
  clearEntries: action((state, payload) => {
    state.hnsEntries = [];
  }),
  loadEntries: action((state, { hnsEntries }) => {
    state.hnsEntries = hnsEntries;
  }),


  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      actions.clearEntries();

      // logging in, call loadTodos
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });
        const mySky = target.payload.mySky;
        const { data } = await mySky.getJSON('localhost/hnsEntries.json');
        if (data) {
          actions.loadEntries({ hnsEntries: data.hnsEntries });
        } else {
          await mySky.setJSON('localhost/hnsEntries.json', { hnsEntries: [] });
        }
        actions.setLoading({ isLoading: false });
      }
    }
  ),
};

export default hnsModel;