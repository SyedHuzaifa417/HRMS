import { NextRequest } from 'next/server';

interface Holiday {
  name: string;
  description: string;
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
    };
  };
  type: string[];
  primary_type: string;
}

interface ApiResponse {
  response: {
    holidays: Holiday[];
  };
}

export interface FormattedHoliday {
  day: number;
  month: string;
  name: string;
  description: string;
  type: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'PK';
    const upcoming = searchParams.get('upcoming') === 'true';
    
    const API_KEY = process.env.CALENDARIFIC_API_KEY;
    const BASE_URL = 'https://calendarific.com/api/v2';
    
    if (!API_KEY) {
      console.error('API Key missing');
      return Response.json({ error: 'API configuration error' }, { status: 500 });
    }

    const currentYear = new Date().getFullYear();
    const url = `${BASE_URL}/holidays?api_key=${API_KEY}&country=${country}&year=${currentYear}`;
    
    console.log('Fetching from:', url.replace(API_KEY, 'HIDDEN_KEY'));
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      return Response.json({ error: 'Failed to fetch holidays' }, { status: response.status });
    }

    const data: ApiResponse = await response.json();
    
    if (!data.response?.holidays) {
      return Response.json({ error: 'No holidays found' }, { status: 404 });
    }

    const holidays = data.response.holidays;
    
    if (upcoming) {
      // Find next upcoming holiday
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextHoliday = holidays
        .filter(holiday => {
          const holidayDate = new Date(holiday.date.iso);
          holidayDate.setHours(0, 0, 0, 0);
          return holidayDate >= today;
        })
        .sort((a, b) => new Date(a.date.iso).getTime() - new Date(b.date.iso).getTime())[0];

      if (!nextHoliday) {
        return Response.json({ error: 'No upcoming holidays found' }, { status: 404 });
      }

      const formatted = formatHoliday(nextHoliday);
      return Response.json({ holiday: formatted });
    }

    // Return all holidays
    const formattedHolidays = holidays.map(formatHoliday);
    return Response.json({ holidays: formattedHolidays });

  } catch (error) {
    console.error('API Route Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function formatHoliday(holiday: Holiday): FormattedHoliday {
  const date = new Date(holiday.date.iso);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });

  return {
    day,
    month,
    name: holiday.name,
    description: holiday.description || '',
    type: holiday.primary_type || holiday.type[0] || 'Holiday'
  };
}