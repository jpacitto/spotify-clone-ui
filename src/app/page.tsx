import styles from './page.module.css'
import MediaPlayer from './components/MediaPlayer';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.top}></div>
      <MediaPlayer />
    </main>
  )
}
