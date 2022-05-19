import MealsData from '../../../data/MealsData';
import styles from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';

const MealsItem = (props: MealsData) => {
  const transfromedPrice = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{transfromedPrice}</div>
      </div>

      {/* Meals Item Form */}
      <div>
        <MealsItemForm />
      </div>
    </li>
  );
};

export default MealsItem;
