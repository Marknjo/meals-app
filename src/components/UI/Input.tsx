import { FormEvent, forwardRef, LegacyRef } from 'react';
import styles from './Input.module.css';

export interface InputProps {
  label: string;
  input: {
    id: string;
    type: string;
    min: string;
    max: string;
    step: string;
    defaultValue: string;
    value?: string;
  };
}

const Input = (
  props: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
};
export default forwardRef(Input);
