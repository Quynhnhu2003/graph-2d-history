// ** Styles Import
import styles from "./index.module.scss";

// ** Another import
import KnowledgeGraph from "../KnowledgeGraph";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <KnowledgeGraph />
    </div>
  );
}
