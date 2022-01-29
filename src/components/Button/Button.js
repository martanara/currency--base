import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ children, className }) => {
  return (<button className={clsx(styles.button, className)}>{children}</button>);
};

export default Button;