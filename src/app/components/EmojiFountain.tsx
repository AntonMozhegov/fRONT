'use client';

import { useEffect, useState } from 'react';
import styles from '../mainPage.module.scss';

const EMOJIS = ['🎉', '✨', '💥', '🚀', '🎊', '📘', '🧪', '📚', '🧠'];

interface Emoji {
    id: number;
    emoji: string;
    delay: number;
    opacity: number;
    offsetX: number;
    offsetY: number;
    rotate: number;
}

export default function EmojiFountain({ trigger }: { trigger: boolean }) {
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    useEffect(() => {
        if (!trigger) return;

        const newEmojis: Emoji[] = Array.from({ length: 10 }).map(() => ({
            id: Date.now() + Math.random(),
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            delay: Math.random() * 0.9, // от 0 до 0.5 сек
            opacity: 0.5 + Math.random() * 0.6, // от 0.5 до 1.0
            offsetX: 60 + Math.random() * 90, // 60–140px вправо
            offsetY: 100 + Math.random() * 70, // 100–150px вверх
            rotate: Math.random() * 60 - 30, // -30 to +30 deg
        }));

        setEmojis(newEmojis);

        const timeout = setTimeout(() => {
            setEmojis([]);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [trigger]);

    return (
        <div className={styles.fountainWrapper}>
            {emojis.map(({ id, emoji, delay, opacity, offsetX, offsetY, rotate }) => (
                <span
                    key={id}
                    className={styles.fountainEmoji}
                    style={{
                        animationDelay: `${delay}s`,
                        opacity,
                        '--x': `${offsetX}px`,
                        '--y': `${offsetY}px`,
                        '--r': `${rotate}deg`,
                    } as React.CSSProperties}
                >
          {emoji}
        </span>
            ))}
        </div>
    );
}