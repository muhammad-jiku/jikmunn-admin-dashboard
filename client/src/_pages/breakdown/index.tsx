import { Box } from '@mui/material';
import BreakdownChart from '../../_components/Charts/BreakdownChart';
import Header from '../../_components/Header';

function Breakdown() {
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category' />
      <Box mt='40px' height='75vh'>
        <BreakdownChart />
      </Box>
    </Box>
  );
}

export default Breakdown;
