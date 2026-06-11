import type { Ref } from 'react';

interface LetterBProps {
    strokeColor?: string;
    pathRef?: Ref<SVGPathElement | null>;
}

export function LetterB({ strokeColor = '#333', pathRef }: LetterBProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            <path
                ref={pathRef}
                d="M 25 15 L 25 85 M 25 15 L 50 58 L 75 15 M 75 15 L 75 85"
                fill="none"
                stroke={strokeColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
