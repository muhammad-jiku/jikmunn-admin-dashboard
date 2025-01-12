import { GridToolbarContainer } from '@mui/x-data-grid';
import CustomToolbar, { CustomToolbarProps } from './CustomToolbar';

type CustomToolbarWrapperProps = CustomToolbarProps & {
  // Add props from GridToolbarProps if needed
};

const CustomToolbarWrapper = ({
  searchInput,
  setSearchInput,
  setSearch,
  ...props
}: CustomToolbarWrapperProps) => {
  return (
    <GridToolbarContainer {...props}>
      <CustomToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={setSearch}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbarWrapper;
