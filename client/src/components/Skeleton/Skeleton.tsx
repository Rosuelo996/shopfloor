import styles from "./Skeleton.module.css";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className}`} />;
}