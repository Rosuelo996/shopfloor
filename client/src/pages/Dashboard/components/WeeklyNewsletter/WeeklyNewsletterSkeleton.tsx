import Skeleton from "../../../../components/Skeleton/Skeleton";
import styles from "./WeeklyNewsletterSkeleton.module.css";

export default function WeeklyNewsletterSkeleton() {
  return (
    <section className={styles.newsletter} aria-hidden="true">
      <div className={styles.header}>
        <div>
          <Skeleton className={styles.eyebrow} />
          <Skeleton className={styles.title} />
        </div>

        <Skeleton className={styles.week} />
      </div>

      <Skeleton className={styles.published} />

      <div className={styles.featured}>
        <Skeleton className={styles.category} />
        <Skeleton className={styles.featuredTitle} />
        <Skeleton className={styles.featuredText} />
        <Skeleton className={styles.featuredText} />
        <Skeleton className={styles.readMore} />

        <div className={styles.featuredBottom}>
          <Skeleton className={styles.readTime} />
          <Skeleton className={styles.important} />
        </div>
      </div>

      <div className={styles.stories}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.story}>
            <span className={styles.marker} />

            <div className={styles.storyContent}>
              <Skeleton className={styles.storyCategory} />
              <Skeleton className={styles.storyTitle} />
              <Skeleton className={styles.storyText} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Skeleton className={styles.updateCount} />
        <Skeleton className={styles.link} />
      </div>
    </section>
  );
}