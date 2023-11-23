import './Typography.css';

export interface TypographyProps {
  tag?: 'h1' | 'h2' | 'div';
  variant?: 'title-1' | 'title-2' | 'label' | 'button';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  tag = 'div',
  variant = 'title-1',
  children
}) => {
  const Component = tag;

  return <Component className={`typography ${variant}`}>{children}</Component>;
};
