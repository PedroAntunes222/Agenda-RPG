import React, {createContext, useState} from 'react'
import BottomMenu from './components/BottomMenu';
import { LoadingProvider } from './context/loading';

export default function App() {
  return (
    <LoadingProvider>
      <BottomMenu />
    </LoadingProvider>
  );
}
