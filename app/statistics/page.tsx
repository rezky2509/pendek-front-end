"use client"
import DashboardHeader from "@/components/dashboardHeader"
import Sidebar from "@/components/Sidebar"

import { Line, LineChart } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]

const page = () => {
    return (
        <>
            <DashboardHeader />
            <main className="dashboard-main">
                <Sidebar />
                <section className="content">
                    <div className="section-header">
                        <h1 className="section-title">Statistics</h1>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Total Clicks</span>
                            {/* <div className="stat-value">XXXXX</div> */}
                            <LineChart
                                style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                                responsive
                                data={data}
                            >
                                <Line type="monotone" dataKey="pv" stroke="var(--fg)" strokeWidth={2} dot={false} activeDot={false} />
                                {/* <RechartsDevtools /> */}
                            </LineChart>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Active Links</span>
                            <div className="stat-value">XXX</div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Top Performer</span>
                            <div className="stat-value">/promo-24</div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default page