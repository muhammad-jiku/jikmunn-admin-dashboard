import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import OverviewChart from '../../_components/Charts/OverviewChart';
import Header from '../../_components/Header';

function Overview() {
  const [view, setView] = useState<string>('units');

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='OVERVIEW'
        subtitle='Overview of general revenue and profit'
      />
      <Box height='75vh'>
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label='View'
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
