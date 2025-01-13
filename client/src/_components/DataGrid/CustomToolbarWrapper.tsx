import { GridToolbarContainer } from '@mui/x-data-grid';
import CustomToolbar, { CustomToolbarProps } from './CustomToolbar';

type CustomToolbarWrapperProps = CustomToolbarProps & {
  // Additional props if required
};

const CustomToolbarWrapper = ({
  searchInput,
  setSearchInput,
  setSearch,
  ...props
}: CustomToolbarWrapperProps) => {
  return (
    <GridToolbarContainer
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CustomToolbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={setSearch}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbarWrapper;
