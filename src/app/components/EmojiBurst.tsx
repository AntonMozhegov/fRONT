'use client';

import { useEffect, useState } from 'react';
import styles from '../mainPage.module.scss';

const EMOJIS = ['🎉', '✨', '💥', '🚀', '🎊', '📘', '🧪', '📚', '🧠'];

interface Emoji {
    id: number;
    left: number;
    top: number;
    emoji: string;
}

export default function EmojiBurst({ trigger }: { trigger: boolean }) {
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    useEffect(() => {
        if (!trigger) return;

        const newEmojis: Emoji[] = Array.from({ length: 10 }).map(() => ({
            id: Date.now() + Math.random(),
            left: Math.random() * 100,
            top: 100,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        }));

        setEmojis(newEmojis);

        const timeout = setTimeout(() => {
            setEmojis([]);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [trigger]);

    return (
        <div className={styles.emojiBurstContainer}>
            {emojis.map(({ id, left, top, emoji }) => (
                <span
                    key={id}
                    className={styles.burstEmoji}
                    style={{
                        left: `${left}%`,
                        top: `${top}%`,
                    }}
                >
          {emoji}
        </span>
            ))}
        </div>
    );
}