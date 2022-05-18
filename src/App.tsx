import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header';
import Meals from './components/Meals/Meals';
import useModal from './hooks/use-modal';

const App = () => {
  const {
    showModal: cartIsShown,
    closeModalHandler: closeCartHandler,
    showModalHandler: showCartHandler,
  } = useModal();

  return (
    <>
      {cartIsShown && <Cart onCloseModal={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
