'use client';

import { useEffect, useState } from 'react';
import styles from '../layout.module.scss';

const EMOJIS = ['💡', '📘', '🎓', '🧪', '🧠', '💻', '📚', '🔬', '📝'];

interface Emoji {
    id: number;
    top: number;
    left: number;
    emoji: string;
}

const MIN_DISTANCE = 12; // минимальное расстояние между эмоджи в % (примерно 100px на экране)

function isTooClose(newEmoji: Emoji, existing: Emoji[]): boolean {
    return existing.some((e) => {
        const dx = e.left - newEmoji.left;
        const dy = e.top - newEmoji.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < MIN_DISTANCE;
    });
}

export default function EmojiBackground() {
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newEmojis: Emoji[] = [];

            let attempts = 0;

            while (newEmojis.length < 3 && attempts < 20) {
                const candidate: Emoji = {
                    id: Date.now() + Math.random(),
                    top: Math.random() * 100,
                    left: Math.random() * 100,
                    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
                };

                // проверка, чтобы не накладывались
                if (
                    !isTooClose(candidate, emojis) &&
                    !isTooClose(candidate, newEmojis)
                ) {
                    newEmojis.push(candidate);
                }

                attempts++;
            }

            setEmojis((prev) => [...prev, ...newEmojis]);

            // Удаляем через 10 секунд
            setTimeout(() => {
                setEmojis((prev) =>
                    prev.filter((e) => !newEmojis.find((ne) => ne.id === e.id))
                );
            }, 10000);
        }, 800);

        return () => clearInterval(interval);
    }, [emojis]);

    return (
        <div className={styles.emojiLayer}>
            {emojis.map(({ id, top, left, emoji }) => (
                <div
                    key={id}
                    className={styles.emoji}
                    style={{ top: `${top}%`, left: `${left}%` }}
                >
                    {emoji}
                </div>
            ))}
        </div>
    );
}