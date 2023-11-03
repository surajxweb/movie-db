import styles from "./Loader.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className={styles.container}>
      <AiOutlineLoading3Quarters className={styles.loader} size="1.7em" />
    </div>
  );
};

export default Loader;
