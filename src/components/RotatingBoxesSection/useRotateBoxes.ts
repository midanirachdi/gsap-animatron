import { type RefObject, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface UseRotateBoxesOptions {
    scope: RefObject<HTMLElement | null>;
    box1Ref: RefObject<HTMLElement | null>;
    box2Ref: RefObject<HTMLElement | null>;
}

export function useRotateBoxes({ scope, box1Ref, box2Ref }: UseRotateBoxesOptions) {
    const handleClickRef = useRef<(() => void) | undefined>(undefined);

    useGSAP(
        (_, contextSafe) => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const timeline = gsap
                    .timeline({
                        paused: true,
                        id: 'rotate',
                        defaults: { duration: 0.6, ease: 'power2.inOut' },
                    })
                    .to(box1Ref.current, { rotation: 180 })
                    .to(box2Ref.current, { rotation: -180 });

                handleClickRef.current = contextSafe?.(() => {
                    if (timeline.progress() === 0) {
                        timeline.play();
                    } else {
                        timeline.reverse();
                    }
                });
            });

            mm.add('(prefers-reduced-motion: reduce)', () => {
                let rotated = false;

                handleClickRef.current = contextSafe?.(() => {
                    rotated = !rotated;
                    gsap.set(box1Ref.current, { rotation: rotated ? 180 : 0 });
                    gsap.set(box2Ref.current, { rotation: rotated ? -180 : 0 });
                });
            });

            return () => mm.revert();
        },
        { scope },
    );

    return handleClickRef;
}
