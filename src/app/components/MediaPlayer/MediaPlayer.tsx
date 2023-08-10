import styles from './MediaPlayer.module.css';
import MediaInfo from './MediaInfo';
import MediaConsole from './MediaConsole';
import MediaVolume from './MediaVolume';

const MediaPlayer = () => {
    return (
        <div className={styles.mediaPlayer}>
            <MediaInfo />
            <MediaConsole />
            <MediaVolume />
        </div>
    );
};

export default MediaPlayer;