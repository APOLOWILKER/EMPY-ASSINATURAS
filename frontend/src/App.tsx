import React from 'react';
import './App.css';


interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  return ( 
      <>
        {children}
      </>
  );
};

export default App;