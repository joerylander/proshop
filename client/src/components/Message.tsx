import type { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type MessageProps = {
  variant: 'info' | 'success' | 'danger';
  children: ReactNode;
};

const Message = ({ variant = 'info', children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
