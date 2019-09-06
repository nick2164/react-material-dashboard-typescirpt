import React, { useEffect, useRef, useState } from 'react';
import { GetQueueInterface, GetQueueMemberInterface, getQueueMembers } from 'hooks/managerAPI/queues';

import QueueMember from './QueueMember';
import 'react-virtualized/styles.css';
import MUIDataTable from 'mui-datatables';

interface QueueMemberListInterface {
  height: number,
  selectedQueue: GetQueueInterface
}

const QueueMemberList = (props: QueueMemberListInterface) => {

  const [searchWord] = useState('');
  // const fetchedData = getFakeQueueMembers('papa', 0, []);
  const fetchedData = getQueueMembers(localStorage.getItem('token'), props.selectedQueue.queueID, [props.selectedQueue]);
  const [viewableQueueMembers, setViewableQueueMembers] = useState(props.selectedQueue.members);
  const [filteredQueueMembers, setFilteredQueueMembers] = useState(props.selectedQueue.members);

  const fetchedQueueMembers = useRef(props.selectedQueue.members);

  fetchedQueueMembers.current = fetchedData;

  if (localStorage.getItem(`queue${props.selectedQueue.queueID}MemberList`) === null) {
    localStorage.setItem(`queue${props.selectedQueue.queueID}MemberList`, JSON.stringify([]));
  }

  useEffect(() => {
    const queueMemberList = localStorage.getItem(`queue${props.selectedQueue.queueID}MemberList`);
    if (queueMemberList !== null) {
      setViewableQueueMembers(JSON.parse(queueMemberList));
      if (fetchedQueueMembers.current.length > 0) {
        if (JSON.parse(queueMemberList).length < 1) {
          localStorage.setItem(`queue${props.selectedQueue.queueID}MemberList`, JSON.stringify(fetchedQueueMembers.current));
          setViewableQueueMembers(JSON.parse(queueMemberList));
        } else {
          if (localStorage.getItem(`queue${props.selectedQueue.queueID}MemberList`) !== JSON.stringify(fetchedQueueMembers.current)) {
            localStorage.setItem(`queue${props.selectedQueue.queueID}MemberList`, JSON.stringify(fetchedQueueMembers.current));
            setViewableQueueMembers(JSON.parse(queueMemberList));
          }
        }
      }
    }
  }, [props.selectedQueue]);

  useEffect(() => {
    if (searchWord === '') {
      setFilteredQueueMembers(viewableQueueMembers);
    } else {
      setFilteredQueueMembers(getFilteredQueueMembers(searchWord, viewableQueueMembers));
    }
  }, [searchWord, viewableQueueMembers]);

  const getFilteredQueueMembers = (searchWord: string, viewableQueueMembers: GetQueueMemberInterface[]): GetQueueMemberInterface[] => {
    let list: GetQueueMemberInterface[] = [];
    if (viewableQueueMembers.length > 0) {
      viewableQueueMembers.forEach((value) => {
        if (
          value.phoneNumber.includes(searchWord)                                // Search through descriptions
        ) {
          list.push(value);
        }
      });
    }
    return list;
  };

  // const setSearch = (props: InputBaseComponentProps) => {
  //   setSearchWord(props.target.value);
  // };


  return (
    <React.Fragment>
      {/*<AppSearchBar searchWord={searchWord} setSearchWord={setSearch} title={'Kø medlemmer'}/>*/}
      <MUIDataTable
        columns={[
          {
            label: '', name: 'statusIcon', options: {
              filter: true,
              sort: true
            }
          },
          {
            label: 'Nummer', name: 'phoneNumber', options: {
              filter: true,
              sort: true
            }
          },
          {
            label: 'Navn', name: 'name', options: {
              filter: true,
              sort: true
            }
          },
          {
            label: 'Status', name: 'status', options: {
              filter: true,
              sort: true
            }
          },
          { label: 'Opkald besvaret', name: 'callsTaken' }
        ]}
        title={<h2>Kø medlemmer</h2>}
        data={
          filteredQueueMembers.map(value => {
            return (
              QueueMember(value)
            );
          })
        }

        options={{
          pagination: true,
          responsive: 'scroll'
        }}

      />
    </React.Fragment>
  );

};

export default QueueMemberList;
