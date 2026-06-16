"use client"
import DashboardHeader from "@/components/dashboardHeader"
import Sidebar from "@/components/Sidebar"

// Later 
import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
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
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Most Device Use</span>
                            <div className="stat-value">XXX</div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Most Clicks Link</span>
                            <div className="stat-value">/promo-24</div>
                        </div>
                    </div>
                    {/* The Graph */}
                    {/* Use flex wrap To break elements onto a new row within a Flexbox container in Tailwind CSS, 
                    you must include the flex-wrap class on the parent elemen */}
                    {/* In other hand, using flex-wrap to warp one row as a new row */}
                    <div className="flex flex-wrap justify-center items-center py-5 px-5 border-black border-2">
                        {/* Title of the box */}
                        <div className="">
                            <div className="text-bold ">
                                <h1>Daily Clicks Report</h1>
                            </div>
                        </div>
                        {/* Then utilize the div to use the full width */}
                        <div className="w-full py-5 flex justify-center-safe items-center">
                            <LineChart
                            style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                            data={data}
                            >   
                                <YAxis width="auto" stroke="var(--color-text-3)" />
                                <XAxis dataKey="name" stroke="var(--color-text-3)" className="py-2"/>
                                <Tooltip
                                cursor={{
                                    stroke: 'var(--color-border-2)',
                                }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface-raised)',
                                    borderColor: 'var(--color-border-2)',
                                }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="var(--color-chart-2)"
                                    dot={{
                                    fill: 'var(--color-surface-base)',
                                    }}
                                    activeDot={{ stroke: 'var(--color-surface-base)' }}
                                />
                            </LineChart>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default page