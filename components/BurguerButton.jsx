import css from '../styles/burguer.module.css'

const BurguerButton = (props) => {
  return (
      <div onClick={props.handleClick} className={`${css.nav_icon_5} ${props.click ? css.open : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
  );
};

export default BurguerButton