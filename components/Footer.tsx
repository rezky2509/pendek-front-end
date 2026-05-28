'use client';
import { useEffect, useState } from 'react';
import { apiStatus } from '@/app/services/api';

export default function Footer() {
    const [active, setActive] = useState(true);

    useEffect(() => {
            const checkStatus = async () => {
                try {
                    // const isAlive = await apiStatus();
                    // console.log(isAlive)
                    // Set specifically to true, don't toggle !prev unless you want a blinking light
                    // setActive(isAlive); 
                } catch (error) {
                    console.error(error)
                    setActive(false);
                    // Don't use alert() here, it blocks the browser thread!
                }
            };
            // Run once immediately, then every 1 Minute (easier on your EC2 CPU)
            // checkStatus();
            const interval = setInterval(checkStatus, 60000); 
            return () => clearInterval(interval);
    }, []);

    return (
        <footer>
            <div className="status-item">
                {/* <div className="status-icon"></div> */}
                <div className={`status-icon ${active ? 'active' : ''}`}></div>
                <span>API Status: </span>
                <span>{active ? 'Online': 'Unable to Connect'}</span>
            </div>
            <div className="status-item">
                <span>Typescript</span>
            </div>
        </footer>
    );
}
