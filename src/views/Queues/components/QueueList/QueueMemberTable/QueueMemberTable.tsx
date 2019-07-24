import MaterialTable from 'material-table';
import React from 'react';
import QueueMembers from './QueueMembers';
import { GetQueueInterface, GetQueueMemberInterface } from 'hooks/managerAPI/queues';

interface QueueMemberTableInterface {
  queueMembers: GetQueueMemberInterface[]
}

const QueueMemberTable = (props:QueueMemberTableInterface) => {

  const queueMemberList = QueueMembers(props.queueMembers);

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        style={{backgroundColor: 'ghostwhite', height: '600px'}}
        columns={[
          { title: 'Antal kald', field: 'callsTaken', type: 'numeric' },
          { title: 'Status', field: 'status', type: 'numeric' },
          { title: 'Nummer', field: 'phoneNumber', type: 'string' },
          { title: 'Navn', field: 'name', type: 'string' }
        ]}
        data={queueMemberList}
        title="Kø medlemmer"

      />
    </div>
  );
};

export default QueueMemberTable;