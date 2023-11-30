import * as React from 'react';

import { Popup } from '../common/Popup/Popup';
import { Typography } from '../common/Typography/Typography';
import { Close, CheckCircle } from '@mui/icons-material';

import { IconButton } from '@mui/material';

import './SuccessSendApplicationPopup.css';
import { ContactInfo } from '../../api/instance';

export interface SuccessSendApplicationPopupProps {
  onClose: () => void;
  contactInfo: ContactInfo;
}

export const SuccessSendApplicationPopup: React.FC<SuccessSendApplicationPopupProps> = ({
  onClose,
  contactInfo
}) => {
  return (
    <Popup>
      <div className='successSendApplicationPopup-title'>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <div className='successSendApplicationPopup-body'>
        <div className='icon'>
          <CheckCircle />
        </div>
        <Typography>Ваша заявка принята! \n Мы сообщим вам позже о решении организатора</Typography>
      </div>
      <div className='successSendApplicationPopup-body'>
        <Typography variant='title-2'>Контакты организатора</Typography>
        {contactInfo.telegram && (
          <div className='successSendApplicationPopup-line'>
            <Typography>Телеграм: </Typography>
            <Typography variant='title-2'>@{contactInfo.telegram}</Typography>
          </div>
        )}
        {contactInfo.phone && (
          <div className='successSendApplicationPopup-line'>
            <Typography>Телеграм: </Typography>
            <Typography variant='title-2'>{contactInfo.phone}</Typography>
          </div>
        )}
        {contactInfo.email && (
          <div className='successSendApplicationPopup-line'>
            <Typography>Телеграм: </Typography>
            <Typography variant='title-2'>{contactInfo.email}</Typography>
          </div>
        )}
        {contactInfo.socialMedia && (
          <div className='successSendApplicationPopup-line'>
            <Typography>Телеграм: </Typography>
            <Typography variant='title-2'>{contactInfo.socialMedia}</Typography>
          </div>
        )}
      </div>
    </Popup>
  );
};
