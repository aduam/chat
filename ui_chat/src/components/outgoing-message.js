import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const OutgoingMessage = ({ message }) => {
  const hour = dayjs(message.createdAt).format('LT');
  const month = dayjs(message.createdAt).format('ll');
  const date = `${hour} | ${month}`;
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{ message.message }</p>
        <span className="time_date">{ date }</span>
      </div>
    </div>
  );
};
