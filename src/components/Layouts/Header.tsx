import styles from './Header.module.css';
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        {/* Cart Button Here */}
        <HeaderCartButton />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt=" table full of delicious food!" srcSet="" />
      </div>
    </>
  );
};

export default Header;
