import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const IncomingMessage = ({ message }) => {
  const hour = dayjs(message.createdAt).format('LT');
  const month = dayjs(message.createdAt).format('ll');
  const date = `${hour} | ${month}`;
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{ message.message }</p>
          <span className="time_date">{ date }</span>
        </div>
      </div>
    </div>
  );
};
