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
          我在学习一些技能，可能会在这里展示。欢迎来到这个小小的数字角落。
        </p>
      </div>
    </div>
  );
}
    