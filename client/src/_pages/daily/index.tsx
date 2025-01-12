import { Box, useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../../_components/Header';
import { IDailyData } from '../../_interfaces';
import { useGetSalesQuery } from '../../_store/api';

function Daily() {
  const [startDate, setStartDate] = useState(new Date('2021-02-01'));
  const [endDate, setEndDate] = useState(new Date('2021-03-01'));
  const theme = useTheme();
  const { data } = useGetSalesQuery();

  const formattedData = useMemo(() => {
    if (!data || data?.data?.length === 0) return [];

    const dailyData: IDailyData[] = data?.data[0]?.dailyData || [];
    const totalSalesLine = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [] as { x: string; y: number }[],
    };
    const totalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [] as { x: string; y: number }[],
    };

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1);
        totalSalesLine.data.push({ x: splitDate, y: totalSales });
        totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
      }
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate, theme.palette.secondary]);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='DAILY SALES' subtitle='Chart of daily sales' />
      <Box height='75vh'>
        <Box display='flex' justifyContent='flex-end'>
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => date && setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => date && setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {data ? (
          <ResponsiveLine
            data={formattedData || []}
            // Other chart properties...
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Daily;
