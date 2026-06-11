import { useRef } from 'react';

import { useRotateBoxes } from './useRotateBoxes';

import shared from '@/styles/shared.module.css';

import styles from './RotatingBoxesSection.module.css';

export function RotatingBoxesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const box1Ref = useRef<HTMLDivElement>(null);
    const box2Ref = useRef<HTMLDivElement>(null);

    const handleClickRef = useRotateBoxes({
        scope: sectionRef,
        box1Ref,
        box2Ref,
    });

    return (
        <section ref={sectionRef} className={`${styles.rotatingBoxes} ${shared.stack}`}>
            <div ref={box1Ref} className={`${shared.box} ${styles.box1}`}>
                box1
            </div>
            <button type="button" className={styles.btn} onClick={() => handleClickRef.current?.()}>
                Rotate
            </button>
            <div ref={box2Ref} className={`${shared.box} ${styles.box2}`}>
                box2
            </div>
        </section>
    );
}
