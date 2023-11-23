import { FormControl, MenuItem, InputLabel, Select as SelectMUI } from '@mui/material';
import { SelectProps as SelectMUIProps } from '@mui/material';

export interface SelectProps extends SelectMUIProps {
  minWidth?: string | number;
  id: string;
  label: string;
  itemList: string[] | number[];
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  id,
  label,
  itemList,
  minWidth = 'auto'
}) => (
  <FormControl variant='filled' sx={{ minWidth }}>
    <InputLabel id={`select-${id}-helper-label`}>{label}</InputLabel>
    <SelectMUI
      labelId={`select-${id}-filled-label`}
      id={`select-${id}-filled`}
      value={value}
      onChange={onChange}
    >
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      {itemList.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </SelectMUI>
  </FormControl>
);
