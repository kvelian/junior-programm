import { FormControl, InputLabel, Select as SelectMUI } from '@mui/material';
import { SelectProps as SelectMUIProps } from '@mui/material';

export interface SelectProps extends SelectMUIProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  minWidth?: string | number;
}

export const Select: React.FC<SelectProps> = ({
  children,
  id,
  label,
  required = false,
  disabled = false,
  minWidth = 'auto',
  ...props
}) => (
  <FormControl variant='filled' sx={{ minWidth }} disabled={disabled} required={required}>
    <InputLabel id={`select-${id}-helper-label`}>{label}</InputLabel>
    <SelectMUI labelId={`select-${id}-filled-label`} id={`select-${id}-filled`} {...props}>
      {children}
    </SelectMUI>
  </FormControl>
);
