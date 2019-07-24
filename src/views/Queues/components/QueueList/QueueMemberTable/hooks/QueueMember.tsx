import React, { useEffect, useState } from 'react';
import { GetQueueMemberInterface } from 'hooks/managerAPI/queues';
import { GetPhone } from 'hooks/managerAPI/phones';

export interface queueMemberInterface {
  phoneNumber: string,
  callsTaken: number,
  status: string,
  name: string
}

const QueueMember = (queueMember: GetQueueMemberInterface): queueMemberInterface => {

  const phone = GetPhone('papa', queueMember.phoneNumber, []);
  const [phoneNumber, setPhoneNumber] = useState('loading...');
  const [callsTaken, setCallsTaken] = useState(0);
  const [status, setStatus] = useState('loading...');
  const [name, setName] = useState('loading...');

  // Handler for phone gathering. This should handle if no the user can't get looked up.
  useEffect(() => {

    setPhoneNumber(queueMember.phoneNumber);
    setCallsTaken(queueMember.status.callsTaken);
    setStatus(queueMember.status.device);

  }, []);

  useEffect(() => {
    if(!phone.isLoading && phone.fetchedData !== undefined) {
      setName(phone.fetchedData.displayName);
    } else if(!phone.isLoading && phone.fetchedData == undefined) {
      setName('Ukendt');
    }

  }, [phone.fetchedData, phone.isLoading]);

  return { phoneNumber, callsTaken, status, name };

};

export default QueueMember;