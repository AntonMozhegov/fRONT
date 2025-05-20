'use client';

import { useParams, useRouter } from 'next/navigation';
import { lecturesHtml } from '@/shared/lectures';
import styles from './LecturePage.module.scss';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';

export default function LecturePage() {
    const { id } = useParams();
    const router = useRouter();

    const html =
        typeof id === 'string' && id in lecturesHtml
            ? lecturesHtml[id as keyof typeof lecturesHtml]
            : null;

    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTopButton(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLabButtonClick = () => {
        // Если id лекции между 5 и 8, перенаправляем на lab/5
        const lectureNumber = parseInt(id as string);
        if (lectureNumber >= 5 && lectureNumber <= 8) {
            router.push('/lab/5');
        } else {
            // Иначе перенаправляем на соответствующую лабораторную
            router.push(`/lab/${id}`);
        }
    };

    if (!html) return <p>Лекция не найдена</p>;

    return (
        <main className={styles.LecturePageWrapper}>
            <button onClick={() => router.back()} className={styles.backButton}>
                ←
            </button>
            <div className={styles.lessonWrapper}>{parse(html)}</div>
            <button onClick={handleLabButtonClick} className={styles.labButton}>
                Перейти к лабораторной работе
            </button>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`${styles.scrollTopButton} ${showScrollTopButton ? styles.show : ''}`}
            >
                ↑
            </button>
        </main>
    );
}