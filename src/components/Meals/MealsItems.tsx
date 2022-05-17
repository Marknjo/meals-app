import styles from './MealsItems.module.css';

const MealsItems = () => {
  return (
    <div className={styles.meals}>
      <ul>
        <li>Meals Item 1</li>
        <li>Meals Item 2</li>
      </ul>
    </div>
  );
};

export default MealsItems;
