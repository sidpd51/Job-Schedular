import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className="h-full flex flex-col">
        <main className="flex-grow container mx-auto mt-10">
            {children}
        </main>
    </div>
);

export default Layout;
