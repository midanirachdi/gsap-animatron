import { useRef } from 'react';

import { useCustomCursor } from './useCustomCursor';

import styles from './CustomCursor.module.css';

export function CustomCursor() {
    const cursorRef = useRef<HTMLSpanElement>(null);

    useCustomCursor({
        scope: cursorRef,
        cursorRef,
    });

    return <span ref={cursorRef} className={styles.cursor} />;
}
