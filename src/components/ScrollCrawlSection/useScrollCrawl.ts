import type { RefObject } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

function getBoxTravelX(box: HTMLElement | null): number {
    if (!box) return 0;

    const padding = 16;
    const viewportWidth = window.innerWidth;
    const boxWidth = box.offsetWidth;

    return Math.max(0, viewportWidth / 2 - boxWidth / 2 - padding);
}

interface UseScrollCrawlOptions {
    scope: RefObject<HTMLElement | null>;
    sectionRef: RefObject<HTMLElement | null>;
    box3Ref: RefObject<HTMLElement | null>;
    letterRef: RefObject<SVGPathElement | null>;
    textRef: RefObject<HTMLElement | null>;
}

export function useScrollCrawl({
    scope,
    sectionRef,
    box3Ref,
    letterRef,
    textRef,
}: UseScrollCrawlOptions) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                if (!textRef.current) return;

                const split = SplitText.create(textRef.current, {
                    type: 'chars,words,lines',
                });

                const scrollTl = gsap.timeline({
                    defaults: { ease: 'power2.out' },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=150%',
                        pin: true,
                        scrub: 1,
                    },
                });

                scrollTl
                    .addLabel('draw', 0)
                    .fromTo(
                        letterRef.current,
                        { drawSVG: '0%' },
                        {
                            drawSVG: '100%',
                            ease: 'power1.inOut',
                            id: 'draw-svg',
                        },
                        'draw',
                    )
                    .to(
                        box3Ref.current,
                        {
                            x: () => getBoxTravelX(box3Ref.current),
                            id: 'scroll-trigger',
                        },
                        'draw',
                    )
                    .addLabel('crawl', '>')
                    .from(
                        split.lines,
                        {
                            rotationX: -50,
                            transformOrigin: '50% 50% -100px',
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power3',
                            stagger: 0.25,
                        },
                        'crawl',
                    );

                return () => {
                    split.revert();
                };
            });

            mm.add('(prefers-reduced-motion: reduce)', () => {
                gsap.set(letterRef.current, { drawSVG: '100%' });
                gsap.set(box3Ref.current, { x: 0 });
                gsap.set(textRef.current, { opacity: 1 });
            });

            return () => mm.revert();
        },
        { scope },
    );
}
