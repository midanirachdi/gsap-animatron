import { lazy, Suspense } from 'react';

import { CustomCursor } from '@/components/CustomCursor/CustomCursor';
import { RotatingBoxesSection } from '@/components/RotatingBoxesSection/RotatingBoxesSection';

import styles from './App.module.css';

const ScrollCrawlSection = lazy(() =>
    import('@/components/ScrollCrawlSection/ScrollCrawlSection').then((module) => ({
        default: module.ScrollCrawlSection,
    })),
);

function App() {
    return (
        <div className={styles.app}>
            <CustomCursor />
            <main className={styles.appMain}>
                <RotatingBoxesSection />
                <Suspense fallback={null}>
                    <ScrollCrawlSection />
                </Suspense>
            </main>
        </div>
    );
}

export default App;
