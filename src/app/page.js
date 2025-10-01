import Image from "next/image";
import styles from "./page.module.css";

export const metadata = { description: '流月的个人主页，介绍作者、展示作品与博客链接。' };

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* 左侧：头像区域 */}
      <div className={styles.profileSection}>
        {/* public目录下的图片直接用绝对路径引用，无需import */}
        <Image
          src="/images/avatar/logo.svg"  // 关键：路径从/开始，对应public目录
          alt="个人头像"
          width={300}  // 根据需要调整宽度
          height={300} // 根据需要调整高度
          className={styles.profileImg}
          priority  // 首页图片优先加载，提升性能
        />
      </div>

      {/* 右侧：文字介绍区域 */}
      <div className={styles.introSection}>
        <h1>你好，我是流月</h1>
        <p className={styles.introText}>
          一名来自重庆市的高中生。
        </p>
        <p className={styles.introText}>
          建造一些东西，感受一些事物。在生活，在记录。
        </p>
        <p className={styles.introText}>
          欢迎你的到来，很高兴与你相遇。
        </p>
      </div>
    </div>
  );
}
    