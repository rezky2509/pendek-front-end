'use client';
import { useEffect, useState } from 'react';
import {apiStatus} from '../app/services/api'

export default function FooterDashboard() {
    const [active, setActive] = useState<boolean>(false);
    const [statusApi, setStatusApi] = useState<boolean>(false)

        useEffect(() => {
            const checkStatus = async () => {
                try {
                    // const isAlive = await apiStatus();
                    // Set specifically to true, don't toggle !prev unless you want a blinking light
                    // setActive(!isAlive); 
                } catch (error) {
                    console.error(error)
                    setActive(false);
                    // Don't use alert() here, it blocks the browser thread!
                }
            };
            // Run once immediately, then every 1 Minute (easier on your EC2 CPU)
            // checkStatus();
            const interval = setInterval(checkStatus, 10000); 
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
