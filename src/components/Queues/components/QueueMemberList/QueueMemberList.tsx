import React, { forwardRef, useEffect, useState } from 'react';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { getFakeQueueMembers, GetQueueInterface, GetQueueMemberInterface } from 'hooks/managerAPI/queues';

import QueueMember from './QueueMember';
import 'react-virtualized/styles.css';
import MaterialTable, { Icons } from 'material-table';
import {
  faArrowDown,
  faCheck,
  faChessBoard,
  faEdit,
  faEraser,
  faFileExport,
  faPlus,
  faRemoveFormat,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface QueueMemberListInterface {
  height: number,
  selectedQueue: GetQueueInterface
}

const QueueMemberList = (props: QueueMemberListInterface) => {

  const [searchWord, setSearchWord] = useState('');
  const fetchedData = getFakeQueueMembers('papa', 0, []);
  const [viewableQueueMembers, setViewableQueueMembers] = useState(props.selectedQueue.members);
  const [filteredQueueMembers, setFilteredQueueMembers] = useState(props.selectedQueue.members);

  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faPlus}/>),
    Check: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faCheck}/>),
    Clear: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faCheck}/>),
    Delete: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faRemoveFormat}/>),
    DetailPanel: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faChessBoard}/>),
    Edit: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faEdit}/>),
    Export: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faFileExport}/>),
    Search: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faSearch}/>),
    SortArrow: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faArrowDown}/>),
    ResetSearch: forwardRef((props, ref) => <FontAwesomeIcon {...props} {...ref} icon={faEraser}/>)
  };

  if (localStorage.getItem('queueMemberList') === null) {
    localStorage.setItem('queueMemberList', JSON.stringify([]));
  }

  const viewableMemberHandler = () => {
    const queueMemberList = localStorage.getItem('queueMemberList');
    if (queueMemberList !== null) {
      setViewableQueueMembers(JSON.parse(queueMemberList));
      if (fetchedData.length > 0) {
        if (JSON.parse(queueMemberList).length < 1) {
          localStorage.setItem('queueMemberList', JSON.stringify(fetchedData));
          setViewableQueueMembers(JSON.parse(queueMemberList));
        } else {
          if (localStorage.getItem('queueMemberList') !== JSON.stringify(fetchedData)) {
            localStorage.setItem('queueMemberList', JSON.stringify(fetchedData));
            setViewableQueueMembers(JSON.parse(queueMemberList));
          }
        }
      }
    }
    console.log(fetchedData);
  };
  useEffect(() => {
    viewableMemberHandler();
  }, []);
  useEffect(() => {
    viewableMemberHandler();
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

  const setSearch = (props: InputBaseComponentProps) => {
    setSearchWord(props.target.value);
  };


  return (
    <React.Fragment>
      {/*<AppSearchBar searchWord={searchWord} setSearchWord={setSearch} title={'Kø medlemmer'}/>*/}
      <MaterialTable
        style={{
          borderRadius: 0,
          height: props.height + 64,
          backgroundColor: 'ghostwhite'
        }}
        columns={[
          { title: '', field: 'statusIcon' },
          { title: 'Nummer', field: 'phoneNumber' },
          { title: 'Navn', field: 'name' },
          { title: 'Status', field: 'status' },
          { title: 'Opkald besvaret', field: 'callsTaken' },
        ]}
        title={<h2>Kø medlemmer</h2>}
        options={{
          maxBodyHeight: props.height,
          pageSize: filteredQueueMembers.length,
          paging: false
        }}
        data={
          filteredQueueMembers.map(value => {
            return (
              QueueMember(value)
            );
          })
        }
        icons={tableIcons}
      />
    </React.Fragment>
  );

};

export default QueueMemberList;