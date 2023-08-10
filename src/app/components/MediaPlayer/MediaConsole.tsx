'use client';

import { useCallback, useRef, DragEventHandler, useState } from 'react';
import Image from 'next/image';
import styles from './MediaPlayer.module.css';

const smallBtnSize = 18;
const largeBtnSize = 30;

const MediaConsole = () => {
    const scrubberRef = useRef<HTMLDivElement | null>(null);

    const [timelineWidth, setTimelineWidth] = useState<number>(10);
    const [playing, setPlaying] = useState<boolean>(false);

    const onDrag: DragEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault();
        const parentRect = event.currentTarget.parentElement?.getBoundingClientRect();
        if (!parentRect || !parentRect.left || !scrubberRef.current) {
            return;
        }

        const dragX = event.clientX - parentRect.left;
        const sliderLength = scrubberRef.current.clientWidth;
        const percentageDone = (dragX / sliderLength) * 100;
        if (dragX > 0 && dragX < sliderLength) {
            setTimelineWidth(percentageDone);
        }
    }, []);

    const clickPlayPause = useCallback(() => {
        setPlaying(!playing);
    }, [playing]);

    return (
        <div className={styles.mediaConsole}>
            <div className={styles.mediaButtons}>
                <Image
                    src="/res/media_player/shuffle.png"
                    alt="Shuffle"
                    width={smallBtnSize}
                    height={smallBtnSize}
                    className={`${styles.disabledButton} ${styles.mediaButton}`}
                />
                <Image
                    src="/res/media_player/previous.png"
                    alt="Previous"
                    width={smallBtnSize}
                    height={smallBtnSize}
                    className={`${styles.enabledButton} ${styles.mediaButton}`}
                />
                {playing ? (
                    <Image
                        src="/res/media_player/play.png"
                        alt="Play"
                        width={largeBtnSize}
                        height={largeBtnSize}
                        className={`${styles.enabledButton} ${styles.mediaButton} ${styles.mediaPlayPause}`}
                        onClick={clickPlayPause}
                    />
                ) : (
                    <Image
                        src="/res/media_player/pause.png"
                        alt="Pause"
                        width={largeBtnSize}
                        height={largeBtnSize}
                        className={`${styles.enabledButton} ${styles.mediaButton} ${styles.mediaPlayPause}`}
                        onClick={clickPlayPause}
                    />
                )}
                <Image
                    src="/res/media_player/next.png"
                    alt="Next"
                    width={smallBtnSize}
                    height={smallBtnSize}
                    className={`${styles.enabledButton} ${styles.mediaButton}`}
                />
                <Image
                    src="/res/media_player/repeat.png"
                    alt="Repeat"
                    width={smallBtnSize}
                    height={smallBtnSize}
                    className={`${styles.disabledButton} ${styles.mediaButton}`}
                />
            </div>
            <div className={styles.mediaScrubber}>
                <div className={styles.mediaTime}>0:00</div>
                <div className={styles.scrubber} ref={scrubberRef}>
                    <div className={styles.scrubberTimeline} style={{ width: `${timelineWidth}%`}}>
                        <div className={styles.scrubberTimelineSlider} draggable={true} onDrag={onDrag} />
                    </div>
                </div>
                <div className={styles.mediaTime}>2:00</div>
            </div>
        </div>
    );
};

export default MediaConsole;
