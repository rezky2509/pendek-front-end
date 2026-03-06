'use client';
import { useEffect, useState } from 'react';

export default function FooterDashboard() {
    const [active, setActive] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="dashboard-footer">
            <div className="status-item">
                <div className={`status-icon ${active ? 'active' : ''}`}></div>
                <span>API Status: ONLINE</span>
            </div>
        </footer>
    );
}
