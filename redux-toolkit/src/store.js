import reducer from "./reducer";
import  {configureStore} from '@reduxjs/toolkit'
import logger from "./Middleware/logger";

export default configureStore({
    reducer,
    middleware: [logger({destination: 'console'})]
})


