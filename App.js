import React, {createContext, useState} from 'react'
import BottomMenu from './pages/components/BottomMenu';
import { LoadingProvider } from './pages/context/loading';

export default function App() {
  return (
    <LoadingProvider>
      <BottomMenu />
    </LoadingProvider>
  );
}
