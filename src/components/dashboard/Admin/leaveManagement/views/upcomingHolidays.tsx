'use client';

import { useState, useEffect } from 'react';

interface FormattedHoliday {
  day: number;
  month: string;
  name: string;
  description: string;
  type: string;
}

const UpcomingHolidays = () => {
  const [holiday, setHoliday] = useState<FormattedHoliday | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextHoliday = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/holidays?upcoming=true&country=PK');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else if (data.holiday) {
          setHoliday(data.holiday);
        } else {
          setError('No upcoming holiday');
        }
      } catch (err) {
        console.error('Error fetching holiday:', err);
        setError('No upcoming holiday');
      } finally {
        setLoading(false);
      }
    };

    fetchNextHoliday();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-soft rounded-xl p-5 w-full mx-auto">
        <h2 className="text-xl font-bold text-charcoal mb-3">Upcoming Holidays</h2>
        <div className="bg-white rounded-2xl p-1 flex items-center">
          <div className="animate-pulse bg-gray-300 rounded-xl w-16 h-16 mr-6"></div>
          <div className="animate-pulse bg-gray-300 h-8 w-64 max-xl:w-96 max-sm:w-32 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !holiday) {
    return (
      <div className="bg-gray-soft rounded-xl p-5 w-full mx-auto">
        <h2 className="text-xl font-bold text-charcoal mb-3">Upcoming Holidays</h2>
        <div className="bg-white rounded-2xl p-1 flex items-center">
        <div className="animate-pulse bg-gray-300 rounded-xl w-16 h-16 mr-6"></div>
        <div className=" w-64 max-xl:w-96 max-sm:w-32 rounded">{error || 'No upcoming holiday'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-soft rounded-xl p-5 w-full mx-auto">
      <h2 className="text-xl font-bold text-charcoal mb-3">Upcoming Holidays</h2>
      
      <div className="bg-white rounded-2xl p-1 flex items-center">
        <div className="bg-[#E7E4E4] rounded-xl mr-2 pb-1 text-center min-w-16">
          <div className="text-3xl font-bold text-charcoal">{holiday.day}</div>
          <div className="text-sm text-charcoal">{holiday.month}</div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-charcoal leading-tight">
            {holiday.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingHolidays;