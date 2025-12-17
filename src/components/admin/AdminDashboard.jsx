import React, { useEffect, useState } from 'react'
import AdminHeader from './components/AdminHeader';
import { Box, ChartArea, Undo2, User } from 'lucide-react';
import SummaryCard from './components/SummaryCard';
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    revenue: 0,
    cancelled: 0
  });
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guestsRes, bookingsRes] = await Promise.all([
          api.get("/guests"),
          api.get("/bookings")
        ]);

        const guests = Array.isArray(guestsRes.data) ? guestsRes.data : (guestsRes.data.content || []);
        const bookings = Array.isArray(bookingsRes.data) ? bookingsRes.data : (bookingsRes.data.content || []);

        // Stats
        const totalUsers = guests.length;
        const totalBookings = bookings.length;
        const totalRevenue = bookings
          .filter(b => b.status === "PAID" || b.status === "COMPLETED")
          .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        const cancelledBookings = bookings.filter(b => b.status === "CANCELLED" || b.status === "Đã hủy").length;

        setStats({
          users: totalUsers,
          bookings: totalBookings,
          revenue: totalRevenue,
          cancelled: cancelledBookings
        });

        // Chart Data (Monthly Revenue)
        const currentYear = new Date().getFullYear();
        const monthlyData = Array(12).fill(0).map((_, i) => ({
          name: `Tháng ${i + 1}`,
          total: 0
        }));

        bookings.forEach(booking => {
          const date = new Date(booking.checkInDate || booking.createdDate);
          if (date.getFullYear() === currentYear && (booking.status === "PAID" || booking.status === "COMPLETED")) {
            const month = date.getMonth(); // 0-11
            monthlyData[month].total += (booking.totalAmount || 0);
          }
        });

        setRevenueData(monthlyData);

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  const summaryInfo = [
    {
      title: "Số người sử dụng",
      value: stats.users.toLocaleString(),
      icon: <User />,
      color: "#7474e1",
    },
    {
      title: "Số đơn đặt phòng",
      value: stats.bookings.toLocaleString(),
      icon: <Box />,
      color: "yellow"
    },
    {
      title: "Doanh thu",
      value: formatCurrency(stats.revenue),
      icon: <ChartArea />,
      color: "green"
    },
    {
      title: "Đơn đã hủy",
      value: stats.cancelled.toLocaleString(),
      icon: <Undo2 />,
      color: "orange"
    },
  ];
  return (
    <div className='space-y-12 p-6'>
      <p className='text-white font-medium text-2xl'>Bảng điều khiển</p>
      <div className='grid grid-cols-4 gap-20 '>
        {summaryInfo.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} icon={info.icon} color={info.color}/>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="bg-[#273142] p-6 rounded-2xl shadow-lg border border-gray-700">
        <h3 className="text-white text-lg font-semibold mb-6">Doanh thu theo tháng (Năm nay)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard