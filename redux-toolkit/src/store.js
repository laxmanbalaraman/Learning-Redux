import reducer from "./reducer";
import  {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from "./Middleware/logger";
// import func from "./Middleware/func";

export default configureStore({
    reducer,
    middleware: [ ...getDefaultMiddleware(), logger({destination: 'console'})] // , func ]
})


