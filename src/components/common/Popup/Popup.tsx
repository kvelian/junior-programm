import './Popup.css';

export interface PopupProps {
  children: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ children }) => (
  <div className='b-popup'>
    <div className='popup'>{children}</div>
  </div>
);
