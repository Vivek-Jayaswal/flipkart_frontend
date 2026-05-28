import store from "../../feature/store"

export type RootState = ReturnType<typeof store.getState>;
