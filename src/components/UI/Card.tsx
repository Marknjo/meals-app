import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  bgStyle: string;
}

const Card = (props: CardProps) => {
  return (
    <div className={`${styles.card} ${styles[`card--${props.bgStyle}`]}`}>
      {props.children}
    </div>
  );
};

export default Card;
