import React, {createContext, useState} from 'react'
import BottomMenu from './components/BottomMenu';
import { LoadingProvider } from './context/loading';
import { initDB } from './Database/sqsliteDatabase';

export default function App() {
  
  initDB();

  return (
    <LoadingProvider>
      <BottomMenu />
    </LoadingProvider>
  );
}
