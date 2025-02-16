// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from '../store-slices/user-details/user-details' // default export 
// // Can import multiple reducers of different slices and add them to the configuration


// // We'll need to persist redux-store to enable persistence of user state 
// export const store = configureStore({
//     reducer : userReducer
// })

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../store-slices/user-details/user-details'; // Default export
import navPageReducer from '../store-slices/navigation/nav-page';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // persisting in sessionStorage
import { encryptData, decryptData } from '../utils/crypto';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        {
            in: (inboundState, key) => encryptData(inboundState),
            out: (outboundState, key) => decryptData(outboundState)
        }
    ]
};

// Combining reducers from multiple slices
const rootReducer = combineReducers({
    user : userReducer, 
    navPage : navPageReducer
})

// Wrap your reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store); // Used for persisting the store
