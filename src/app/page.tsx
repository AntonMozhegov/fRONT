'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import lectures from '@/widgets/LectureContent/config/lecturesConfig';
import labs from '@/widgets/LectureContent/config/labsConfig';
import styles from './mainPage.module.scss';
import EmojiBackground from './components/EmojiBackground';
import EmojiFountain from './components/EmojiFountain';
import CelebrationExplosion from './components/CelebrationExplosion';

export default function HomePage() {
    const [activeFountain, setActiveFountain] = useState<number | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const router = useRouter();

    const handleHover = (id: number) => {
        setActiveFountain(id);
    };

    const handleTestClick = () => {
        setShowCelebration(true);

        setTimeout(() => {
            router.push(
                'https://distedu.vsau.ru/quest/preview/start/quest_id/28909/subject_id/9127/redirect_url/%252Fquest%252Fsubject%252Ftest%252Fsubject_id%252F9127'
            );
        }, 2000);
    };

    return (
        <main className={styles.mainContainer}>
            <EmojiBackground />

            {/* 🎉 Праздничная анимация */}
            {showCelebration && <CelebrationExplosion />}

            {/* 🧪 Ссылка на тест */}
            <div className={styles.testLinkWrapper}>
                <button className={styles.testLink} onClick={handleTestClick}>
                    🧪 Тестирование
                </button>
            </div>

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