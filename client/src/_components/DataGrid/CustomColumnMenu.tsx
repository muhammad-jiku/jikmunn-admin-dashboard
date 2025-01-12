import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
  GridColumnMenuProps,
} from '@mui/x-data-grid';

type CustomColumnMenuProps = GridColumnMenuProps;

function CustomColumnMenu(props: CustomColumnMenuProps) {
  const { hideMenu, colDef, open } = props;

  return (
    <GridColumnMenuContainer open={open} colDef={colDef} hideMenu={hideMenu}>
      <GridColumnMenuFilterItem
        onClick={hideMenu}
        column={colDef}
        colDef={colDef}
      />
      <GridColumnMenuHideItem
        onClick={hideMenu}
        column={colDef}
        colDef={colDef}
      />
    </GridColumnMenuContainer>
  );
}

export default CustomColumnMenu;
