import './Button.css';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => (
  <button {...props} className={`button ${variant}`}>
    {children}
  </button>
);
