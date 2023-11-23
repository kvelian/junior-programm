import '../../../../static/icons/cross.svg';
import './IconButton.css';

export interface IconButtonProps extends React.ComponentProps<'button'> {
  variant: 'cross';
}

export const IconButton: React.FC<IconButtonProps> = ({ variant, ...props }) => {
  return <button {...props} className={`iconButton ${variant}`} />;
};
