import Cart from './components/Cart/Cart';
import Header from './components/Layouts/Header';
import Meals from './components/Meals/Meals';
import useModal from './hooks/use-modal';
import CartProvider from './store/cart-provider';

const App = () => {
  const {
    showModal: cartIsShown,
    closeModalHandler: closeCartHandler,
    showModalHandler: showCartHandler,
  } = useModal();

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseModal={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
