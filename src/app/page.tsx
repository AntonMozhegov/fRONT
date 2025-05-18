'use client';

import Link from 'next/link';
import { useState } from 'react';
import lectures from '@/widgets/LectureContent/config/lecturesConfig';
import labs from '@/widgets/LectureContent/config/labsConfig';
import styles from './mainPage.module.scss';
import EmojiBackground from './components/EmojiBackground';
import EmojiFountain from './components/EmojiFountain';

export default function HomePage() {
    const [activeFountain, setActiveFountain] = useState<number | null>(null);

    const handleHover = (id: number) => {
        setActiveFountain(id);
    };

    // @ts-ignore
    return (
        <main className={styles.mainContainer}>
            <EmojiBackground />

            <h1 className={styles.mainTitle}>🎓 Лекции</h1>
            <ul className={styles.list}>
                {lectures.map(({ id, title }) => (
                    <li key={id} className={styles.lectureLi}>
                        <span className={styles.index}>{id}</span>
                        <div className={styles.linkWrapper}>
                            <Link
                                className={styles.lectureLink}
                                href={`/lectures/${id}`}
                                onMouseEnter={() => handleHover(id)}
                            >
                                <span>📘 {title}</span>
                                {activeFountain === id && <EmojiFountain trigger />}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            <h1 className={styles.mainTitle}>🧪 Лабораторные работы</h1>
            <ul className={styles.list}>
                {labs.map(({ id, title }) => (
                    <li key={id} className={styles.lectureLi}>
                        <span className={styles.index}>{id}</span>
                        <div className={styles.linkWrapper}>
                            <Link
                                className={styles.lectureLink}
                                href={`/lab/${id}`}
                                onMouseEnter={() => handleHover(id)}
                            >
                                <span>🔬 {title}</span>
                                {activeFountain === id && <EmojiFountain trigger />}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}