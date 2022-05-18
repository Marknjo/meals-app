import { useState } from 'react';
import Header from './components/Layouts/Header';
import Meals from './components/Meals/Meals';
import Modal from './components/UI/Modal';
import useModal from './hooks/use-modal';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
