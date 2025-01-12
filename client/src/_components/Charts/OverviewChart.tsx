import { useTheme } from '@mui/material';
import { ResponsiveLine, Serie } from '@nivo/line';
import { useMemo } from 'react';
import { ISale } from '../../_interfaces';
import { useGetSalesQuery } from '../../_store/api';

type OverviewChartProps = {
  view: string;
};

function OverviewChart({ view }: OverviewChartProps) {
  const isDashboard = false;
  const theme = useTheme();
  const { data: salesApiResponseData, isLoading } = useGetSalesQuery();

  // Ensure `data` is of type `ISale[]`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const salesData: ISale[] = salesApiResponseData?.data || [];

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!salesData.length) {
      return [
        {
          id: 'totalSales',
          color: theme.palette.secondary.main,
          data: [] as { x: string; y: number }[],
        },
        {
          id: 'totalUnits',
          color: theme.palette.secondary[600],
          data: [] as { x: string; y: number }[],
        },
      ];
    }

    const totalSalesData: { x: string; y: number }[] = [];
    const totalUnitsData: { x: string; y: number }[] = [];

    salesData.forEach((sale) => {
      let cumulativeSales = 0;
      let cumulativeUnits = 0;

      sale.monthlyData.forEach(({ month, totalSales, totalUnits }) => {
        cumulativeSales += totalSales;
        cumulativeUnits += totalUnits;

        totalSalesData.push({ x: month, y: cumulativeSales });
        totalUnitsData.push({ x: month, y: cumulativeUnits });
      });
    });

    const totalSalesLine: Serie = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: totalSalesData,
    };
    const totalUnitsLine: Serie = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: totalUnitsData,
    };

    return [totalSalesLine, totalUnitsLine];
  }, [salesData, theme.palette.secondary]);

  if (isLoading || !salesApiResponseData) return 'Loading...';

  return (
    <ResponsiveLine
      data={view === 'sales' ? [totalSalesLine] : [totalUnitsLine]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      yFormat=' >-.2f'
      curve='catmullRom'
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? '' : 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ''
          : `Total ${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
        legendOffset: -60,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={
        !isDashboard
          ? [
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
}

export default OverviewChart;
