import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  bgStyle: string;
  pdStyle?: string;
}

const Card = (props: CardProps) => {
  return (
    <div
      className={`${styles.card} ${styles[`card--${props.bgStyle}`]}  ${
        props.pdStyle ? styles[`card--${props.pdStyle}`] : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
