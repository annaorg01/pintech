import React, { useState, useMemo, useEffect } from 'react';

// --- Mock Data ---
// Added more data for the 2-year view
const mockPayments = [
    // Last year data
    { id: 1, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2025-08-15', amount: 1250.75 },
    { id: 2, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2025-08-10', amount: 230.40 },
    { id: 3, authority: 'עיריית גבעתיים', type: 'ארנונה', date: '2025-07-16', amount: 980.00 },
    { id: 4, authority: 'עיריית תל אביב-יפו', type: 'חניה', date: '2025-07-05', amount: 100.00 },
    { id: 5, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2025-06-11', amount: 215.90 },
    { id: 6, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2025-06-15', amount: 1250.75 },
    { id: 7, authority: 'עיריית רמת גן', type: 'חינוך', date: '2025-05-20', amount: 450.00 },
    { id: 8, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2025-04-09', amount: 245.10 },
    { id: 9, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2025-04-15', amount: 1250.75 },
    { id: 10, authority: 'עיריית הרצליה', type: 'ארנונה', date: '2025-03-14', amount: 1100.50 },
    { id: 11, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2025-02-12', amount: 198.80 },
    { id: 12, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2025-02-15', amount: 1250.75 },
    { id: 13, authority: 'עיריית תל אביב-יפו', type: 'חניה', date: '2025-01-28', amount: 75.00 },
    { id: 14, authority: 'עיריית גבעתיים', type: 'ארנונה', date: '2024-11-16', amount: 980.00 },
    { id: 15, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2024-12-10', amount: 280.30 },
    { id: 16, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2024-12-15', amount: 1250.75 },
    { id: 17, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2024-10-15', amount: 1250.75 },
    // Data from 2 years ago
    { id: 18, authority: 'עיריית תל אביב-יפו', type: 'ארנונה', date: '2024-08-15', amount: 1200.00 },
    { id: 19, authority: 'תאגיד המים מי אביבים', type: 'מים', date: '2024-08-10', amount: 210.00 },
    { id: 20, authority: 'עיריית רמת גן', type: 'חינוך', date: '2024-05-20', amount: 450.00 },
    { id: 21, authority: 'עיריית תל אביב-יפו', type: 'חניה', date: '2024-02-05', amount: 50.00 },
    { id: 22, authority: 'עיריית הרצליה', type: 'ארנונה', date: '2023-11-14', amount: 1050.50 },
];

// --- SVG Icons ---
const HomeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const WaterIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
    </svg>
);

const CarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 16.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.5"></path>
        <path d="M20 10h-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3H4"></path>
        <path d="M20 15H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"></path>
        <path d="M7 11v-1"></path>
        <path d="M17 11v-1"></path>
    </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <path d="M9 22v-4h6v4"></path>
        <path d="M8 6h.01"></path>
        <path d="M16 6h.01"></path>
        <path d="M12 6h.01"></path>
        <path d="M12 10h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 10h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 10h.01"></path>
        <path d="M8 14h.01"></path>
    </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

// --- Components ---

const Header = () => (
    <header className="flex items-center justify-between pt-10 pb-4 text-white">
        <h1 className="text-xl font-bold w-full text-center">תשלומים לרשויות</h1>
    </header>
);

interface TimeRangeSelectorProps {
    selectedRange: string;
    onSelectRange: (range: string) => void;
}

const TimeRangeSelector = ({ selectedRange, onSelectRange }: TimeRangeSelectorProps) => {
    const buttonStyle = "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300";
    const activeStyle = "bg-white text-blue-600 shadow-md";
    const inactiveStyle = "bg-white/10 text-white";

    return (
        <div className="flex justify-center bg-black/20 rounded-full p-1 w-fit mx-auto">
            <button 
                onClick={() => onSelectRange('lastYear')} 
                className={`${buttonStyle} ${selectedRange === 'lastYear' ? activeStyle : inactiveStyle}`}
            >
                שנה אחרונה
            </button>
            <button 
                onClick={() => onSelectRange('lastTwoYears')} 
                className={`${buttonStyle} ${selectedRange === 'lastTwoYears' ? activeStyle : inactiveStyle}`}
            >
                שנתיים אחרונות
            </button>
        </div>
    );
};

interface ChartData {
    type: string;
    total: number;
    color: string;
}

interface DonutChartProps {
    data: ChartData[];
    total: number;
}

const DonutChart = ({ data, total }: DonutChartProps) => {
    const size = 180;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercent = 0;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                    <circle 
                        cx={size / 2} 
                        cy={size / 2} 
                        r={radius} 
                        fill="none" 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth={strokeWidth} 
                    />
                    {data.map((item, index) => {
                        const percent = total > 0 ? (item.total / total) * 100 : 0;
                        const offset = circumference - (accumulatedPercent / 100) * circumference;
                        const dashArray = `${(percent / 100) * circumference} ${circumference}`;
                        accumulatedPercent += percent;
                        return (
                            <circle
                                key={index}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={dashArray}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-sm">סה"כ לתקופה</span>
                    <span className="text-2xl font-bold">₪{Math.round(total).toLocaleString()}</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-white text-sm">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface FinancialInsightProps {
    insight: string;
}

const FinancialInsight = ({ insight }: FinancialInsightProps) => {
    if (!insight) return null;
    return (
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl flex items-start gap-3">
           <InfoIcon className="w-5 h-5 text-blue-200 mt-1 flex-shrink-0" />
           <p className="text-sm text-blue-100">{insight}</p>
        </div>
    );
};

interface Payment {
    id: number;
    authority: string;
    type: string;
    date: string;
    amount: number;
}

interface TransactionItemProps {
    payment: Payment;
    delay: number;
}

const TransactionItem = ({ payment, delay }: TransactionItemProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const getIcon = (type: string) => {
        const iconProps = { className: "w-6 h-6 text-blue-200" };
        switch (type) {
            case 'ארנונה': return <HomeIcon {...iconProps} />;
            case 'מים': return <WaterIcon {...iconProps} />;
            case 'חניה': return <CarIcon {...iconProps} />;
            case 'חינוך': return <BookIcon {...iconProps} />;
            default: return <BuildingIcon {...iconProps} />;
        }
    };

    return (
        <div className={`flex items-center justify-between p-3 bg-white/10 backdrop-blur-md rounded-2xl transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">{getIcon(payment.type)}</div>
                <div>
                    <p className="font-bold text-white">{payment.authority}</p>
                    <p className="text-sm text-blue-200">{payment.type} - {new Date(payment.date).toLocaleDateString('he-IL')}</p>
                </div>
            </div>
            <p className="font-bold text-lg text-white" dir="ltr">
                - ₪{payment.amount.toFixed(2)}
            </p>
        </div>
    );
};

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeRange, setTimeRange] = useState('lastYear'); // 'lastYear' or 'lastTwoYears'

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const filteredPayments = useMemo(() => {
        const now = new Date();
        const startDate = new Date();
        
        if (timeRange === 'lastYear') {
            startDate.setFullYear(now.getFullYear() - 1);
        } else if (timeRange === 'lastTwoYears') {
             startDate.setFullYear(now.getFullYear() - 2);
        }
        
        return mockPayments.filter(p => new Date(p.date) >= startDate);
    }, [timeRange]);

    const donutChartData = useMemo(() => {
        const dataByType = filteredPayments.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + p.amount;
            return acc;
        }, {} as Record<string, number>);
        
        const colors = ['#38bdf8', '#34d399', '#facc15', '#fb923c', '#a78bfa'];
        return Object.entries(dataByType)
            .sort(([, a], [, b]) => b - a)
            .map(([type, total], index) => ({
                type,
                total,
                color: colors[index % colors.length]
            }));
    }, [filteredPayments]);

    const totalPaid = useMemo(() => filteredPayments.reduce((sum, p) => sum + p.amount, 0), [filteredPayments]);
    
    const financialInsight = useMemo(() => {
        if (filteredPayments.length === 0) return "אין נתוני תשלומים לתקופה זו.";
        const topCategory = donutChartData[0];
        if (!topCategory) return "אין נתוני תשלומים לתקופה זו.";
        return `ההוצאה הגדולה ביותר שלך בתקופה זו הייתה על ${topCategory.type}, בסך ₪${Math.round(topCategory.total).toLocaleString()}.`;
    }, [donutChartData, filteredPayments]);

    const sortedPayments = [...filteredPayments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const mainContainerClass = `transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[400px] h-[820px] bg-slate-900 rounded-[60px] p-4 shadow-2xl border-4 border-slate-700">
                <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-[45px] overflow-hidden relative">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-full z-10"></div>
                    
                    <div className="h-full overflow-y-auto hide-scrollbar" dir="rtl">
                        <div className="p-4 text-white">
                            <Header />

                            <main className={`space-y-6 ${mainContainerClass}`}>
                                <TimeRangeSelector selectedRange={timeRange} onSelectRange={setTimeRange} />
                                <DonutChart data={donutChartData} total={totalPaid} />
                                <FinancialInsight insight={financialInsight} />

                                <div>
                                    <h2 className="font-bold text-xl mb-4 px-2">פירוט תשלומים</h2>
                                    <div className="space-y-3 pb-8">
                                        {sortedPayments.map((p, index) => (
                                            <TransactionItem key={p.id} payment={p} delay={index * 50} />
                                        ))}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
