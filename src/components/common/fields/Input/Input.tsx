import { Typography } from '../../Typography/Typography';
import './Input.css';

export interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, children, ...props }) => (
  <div className='input-container'>
    <Typography variant='label'>{label}</Typography>
    <input {...props} className={`input`}>
      {children}
    </input>
  </div>
);
