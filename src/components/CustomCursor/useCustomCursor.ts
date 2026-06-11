import type { RefObject } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface UseCustomCursorOptions {
    scope: RefObject<HTMLElement | null>;
    cursorRef: RefObject<HTMLElement | null>;
}

export function useCustomCursor({ scope, cursorRef }: UseCustomCursorOptions) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
                const cursor = cursorRef.current;
                if (!cursor) return;

                const xTo = gsap.quickTo(cursor, 'x', {
                    duration: 0.2,
                    ease: 'power3.out',
                });
                const yTo = gsap.quickTo(cursor, 'y', {
                    duration: 0.2,
                    ease: 'power3.out',
                });

                const moveCursor = (e: MouseEvent) => {
                    xTo(e.clientX);
                    yTo(e.clientY);
                };

                window.addEventListener('mousemove', moveCursor);

                return () => {
                    window.removeEventListener('mousemove', moveCursor);
                };
            });

            return () => mm.revert();
        },
        { scope },
    );
}
