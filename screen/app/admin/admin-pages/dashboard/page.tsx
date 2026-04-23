'use client';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { adminAPI } from '@/app/API/admin.api';
import { IAnalytics } from '@/app/Types/APIResponse';
import { Heading, Paragraph } from '@/app/Components/Typography/TypoGraphy';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

// ApexCharts needs dynamic import because it uses window
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboard() {
    const { data, isLoading, error } = useQuery<IAnalytics>({
        queryKey: ['analytics'],
        queryFn: adminAPI.Analytics,
    });

    if (isLoading) return <Paragraph>Loading dashboard...</Paragraph>;
    if (error || !data) return <Paragraph>Failed to load analytics.</Paragraph>;

    const { cards, charts } = data.data;


    // Map line chart data
    const memberGrowthSeries = [
        {
            name: 'Members',
            data: charts.memberGrowthLine.map((item: any) => item.count),
        },
    ];



    const memberGrowthOptions = {
        chart: {
            id: 'member-growth',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: true, easing: 'easeinout', speed: 500 },
        },
        xaxis: {
            categories: charts.memberGrowthLine.map(
                (item: any) => `${item._id.month}/${item._id.year}`
            ),
            labels: { rotate: -45 },
        },
        stroke: { curve: 'smooth' as const, width: 3 },
        colors: ['#4f46e5'],
        tooltip: { theme: 'dark' },
    };

    const sermonsBarSeries = [
        {
            name: 'Sermons',
            data: charts.sermonsBarChart.map((item: any) => item.count),
        },
    ];


    const sermonsBarOptions = {
        chart: { id: 'sermons-bar', toolbar: { show: false } },
        xaxis: { categories: charts.sermonsBarChart.map((item: any) => item._id.month) },
        colors: ['#10b981'],
        tooltip: { theme: 'dark' },
    };

    const ministryPieSeries = charts.ministryPieChart.map((item: any) => item.count);
    const ministryPieOptions = {
        chart: { id: 'ministry-pie' },
        labels: charts.ministryPieChart.map((item: any) => item._id),
        colors: ['#f97316', '#3b82f6', '#ef4444', '#6366f1', '#facc15'],
        legend: { position: 'bottom' as const },
        tooltip: { theme: 'dark' },
    };

    return (
        <motion.main
            className="p-6 space-y-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Heading>Dashboard Overview</Heading>
            <Paragraph className="text-gray-600">
                Welcome back! Here's what's happening in your community today.
            </Paragraph>

            {/* 🔹 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Total Members */}
                <Card
                    title="Total Members"
                    value={cards.totalMembers}
                    growth={cards.membersGrowthPercent}
                />
                {/* Total Sermons */}
                <Card
                    title="Total Sermons"
                    value={cards.totalSermons}
                    growth={cards.sermonsGrowthPercent}
                />
                {/* Active Ministries */}
                <Card
                    title="Active Ministries"
                    value={cards.activeMinistries}
                    growth={`${cards.newMinistriesQuarter} new this quarter`}
                    neutral
                />
                {/* Avg Attendance */}
                <Card
                    title="Avg Attendance Growth"
                    value={cards.avgAttendanceGrowth}
                    neutral
                />
            </div>

            {/* 🔹 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Member Growth Line */}
                <ChartCard title="Member Growth (Last Months)">
                    <Chart options={memberGrowthOptions} series={memberGrowthSeries} type="line" height={350} />
                </ChartCard>

                {/* Sermons Bar */}
                <ChartCard title="Sermons (Monthly)">
                    <Chart options={sermonsBarOptions} series={sermonsBarSeries} type="bar" height={350} />
                </ChartCard>

                {/* Ministry Pie */}
                <ChartCard title="Ministries Distribution">
                    <Chart options={ministryPieOptions} series={ministryPieSeries} type="pie" height={350} />
                </ChartCard>
            </div>
        </motion.main>
    );
}

// =========================
// Card Component
// =========================
interface CardProps {
    title: string;
    value: string | number;
    growth?: string;
    neutral?: boolean;
}
function Card({ title, value, growth, neutral }: CardProps) {
    const isPositive = !neutral && growth && parseFloat(growth) >= 0;
    const isNegative = !neutral && growth && parseFloat(growth) < 0;

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 flex flex-col justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="mt-2 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
                {growth && !neutral && (
                    <span
                        className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {isPositive && <ArrowUp className="w-4 h-4 mr-1" />}
                        {isNegative && <ArrowDown className="w-4 h-4 mr-1" />}
                        {growth}%
                    </span>
                )}
            </div>
        </div>
    );
}

// =========================
// ChartCard Component
// =========================
interface ChartCardProps {
    title: string;
    children: React.ReactNode;
}
function ChartCard({ title, children }: ChartCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
            <p className="text-gray-600 font-medium mb-4">{title}</p>
            {children}
        </div>
    );
}