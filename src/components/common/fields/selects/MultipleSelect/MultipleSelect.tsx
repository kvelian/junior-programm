import { FormControl, InputLabel, Select as SelectMUI } from '@mui/material';
import { SelectProps as SelectMUIProps } from '@mui/material';

export interface MultipleSelectProps extends SelectMUIProps {
  id: string;
  label: string;
  minWidth?: string | number;
}

export const MultipleSelect: React.FC<MultipleSelectProps> = ({
  children,
  value,
  onChange,
  id,
  label,
  required = false,
  disabled = false,
  minWidth = 'auto'
}) => (
  <FormControl variant='filled' sx={{ minWidth }} disabled={disabled} required={required}>
    <InputLabel id={`select-${id}-helper-label`}>{label}</InputLabel>
    <SelectMUI
      labelId={`select-${id}-filled-label`}
      id={`select-${id}-filled`}
      value={value}
      onChange={onChange}
    >
      {children}
    </SelectMUI>
  </FormControl>
);
