'use client';
import { useEffect, useState } from 'react';
import styles from './CelebrationExplosion.module.scss';

const EMOJIS = ['🎉', '🎊', '🪅', '🎈', '✨', '🥳'];

export default function CelebrationExplosion() {
    type Explosion = {
        id: number;
        emoji: string;
        left: number;
        delay: number;
    };

    const [explosions, setExplosions] = useState<Explosion[]>([]);

    useEffect(() => {
        const tempExplosions = Array.from({ length: 60 }, (_, i) => ({
            id: i,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            left: Math.random() * 100,
            delay: Math.random() * 0.3,
        }));
        setExplosions(tempExplosions);
    }, []);

    return (
        <div className={styles.explosionContainer}>
            {explosions.map(({ id, emoji, left, delay }) => (
                <span
                    key={id}
                    className={styles.emoji}
                    style={{
                        left: `${left}%`,
                        animationDelay: `${delay}s`,
                    }}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
}