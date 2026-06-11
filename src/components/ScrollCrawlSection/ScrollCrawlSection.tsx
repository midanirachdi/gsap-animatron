import { useRef } from 'react';

import { LetterB } from '@/components/LetterB/LetterB';

import { useScrollCrawl } from './useScrollCrawl';

import shared from '@/styles/shared.module.css';

import styles from './ScrollCrawlSection.module.css';

const CRAWL_TEXT =
    'EPISODE IV: THE JAVASCRIPT AWAKENS. It is a period of digital civil war. Rebel developers, striking from a hidden repository.';

export function ScrollCrawlSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const box3Ref = useRef<HTMLDivElement>(null);
    const letterRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useScrollCrawl({
        scope: sectionRef,
        sectionRef,
        box3Ref,
        letterRef,
        textRef,
    });

    return (
        <section ref={sectionRef} className={styles.scrollCrawl}>
            <div className={styles.scene}>
                <div ref={box3Ref} className={`${shared.box} ${styles.box3}`}>
                    <LetterB pathRef={letterRef} />
                </div>
                <div ref={textRef} className={styles.text}>
                    {CRAWL_TEXT}
                </div>
            </div>
        </section>
    );
}
