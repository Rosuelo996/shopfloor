import styles from "./WeeklyNewsletter.module.css";
import type { NewsletterData } from "../../../../types/newsletter";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  newsletter: NewsletterData | null;
};

export default function WeeklyNewsletter({ newsletter }: Props) {
  const formatPublishedAt = (date: string) => {
    return new Date(date)
      .toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      })
      .replace(",", " ·");
  };

  function getMarkerClass(category: string) {
    if (category.toLowerCase() === "product") return styles.product;
    if (category.toLowerCase() === "visual merchandising") return styles.visual;

    return styles.general;
  }

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.newsletter}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>THE WEEKLY</span>
          <h2>Newsletter</h2>
        </div>

        <div className={styles.week}>
          <span>W{newsletter?.weekNumber}</span>
          <small>/{newsletter?.year.toString().slice(-2)}</small>
        </div>
      </div>

      <p className={styles.published}>
        {newsletter && formatPublishedAt(newsletter.publishedAt)}
      </p>

      <article className={styles.featured}>
        <div className={styles.featuredTop}>
          <span className={styles.category}>
            {newsletter?.items[0].category}
          </span>
        </div>

        <h3>{newsletter?.items[0].title}</h3>

        <p>
          {isExpanded
            ? newsletter?.items[0].content
            : `${newsletter?.items[0].content.slice(0, 130)}...`}
        </p>

        <button
          className={styles.readMore}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
        <div className={styles.featuredBottom}>
          <span className={styles.readTime}>Company update · 2 min read</span>
          <span className={styles.important}>Important</span>
        </div>
      </article>

      <div className={styles.stories}>
        {newsletter?.items.slice(1, 4).map((item) => (
          <article key={item.id} className={styles.story}>
            <div
              className={`${styles.marker} ${getMarkerClass(item.category)}`}
            />

            <div>
              <span className={styles.storyCategory}>{item.category}</span>

              <h3>{item.title}</h3>

              <p>{item.content}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <span>{newsletter?.items.length} updates this week</span>

        <Link to="/newsletter" className={styles.link}>
          Read full newsletter <span>→</span>
        </Link>
      </div>
    </section>
  );
}
