// ** styles Import
import styles from "./index.module.scss";

// ** Another Import
import { HeaderHomeProps } from "../../types/homeTypes";

function HeaderHome(props: HeaderHomeProps) {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>faniverse</div>
      <div className={styles.header__menu}>
        <button className={styles.hamburger} onClick={props.onClickSideBar}>
          <span className="material-symbols-outlined" style={{fontSize: '48px'}}>dehaze</span>{" "}
        </button>
        <button className={styles.bag} onClick={props.onClickShopBag}>
          <span className="material-symbols-outlined" style={{fontSize: '48px'}}>shopping_bag</span>
        </button>
      </div>
    </div>
  );
}

export default HeaderHome;
