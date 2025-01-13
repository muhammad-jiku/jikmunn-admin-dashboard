import { Search } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';

export type CustomToolbarProps = {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
};

function CustomToolbar({
  searchInput,
  setSearchInput,
  setSearch,
}: CustomToolbarProps) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      width='100%'
    >
      {/* Left Side: Toolbar buttons */}
      <Box display='flex' gap='1rem' alignItems='center'>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>

      {/* Right Side: Search bar */}
      <TextField
        label='Search...'
        sx={{ mb: '0.5rem', width: '15rem' }}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        variant='standard'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  setSearch(searchInput);
                  setSearchInput('');
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default CustomToolbar;
