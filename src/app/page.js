"use client";
import Image from "next/image";
import styles from "./page.module.css";

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
          我在这里，一边攀登着书山题海，一边悄悄学习着各种有趣的新技能——也许是几行代码，也许是几笔插画，也许是刚学会剪辑的一段视频。这个小小的数字角落，就像我的一方实验田，可能会成为我分享练习成果和成长点滴的地方。
        </p>
        <p className={styles.introText}>
          欢迎你的到来，很高兴与你相遇。
        </p>
      </div>
    </div>
  );
}
    