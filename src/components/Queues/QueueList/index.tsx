// TODO: This needs to have somekind of cache, so that in the future, it will have to do a slow load in the start, and then after that, use the cache.
//  After that, it will lookup the API for changes, and if anything is changed, then update the view.
//  I have tried with local storage, and this is not doable, whenever a big customer is coming in, because their data will exceed the 5MB limit.

import { AppSearchBar } from 'components/index';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import Queue from './Queue';
import React, { useEffect, useState } from 'react';
import { GetQueueInterface, getQueues } from '../../../hooks/managerAPI/queues';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

interface QueueListInterface {
  setSelectedQueue: (queue: GetQueueInterface) => void,
  height: number
}

const QueueList = (props: QueueListInterface) => {

  // const [, fetchedData] = getQueues('papa', []);
  const fetchedData = getQueues(localStorage.getItem('token'), []);
  const [viewableQueues, setViewableQueues] = useState<GetQueueInterface[]>([]);
  const [filteredQueueList, setFilteredQueueList] = useState<GetQueueInterface[]>([]);
  const [searchWord, setSearchWord] = useState('');

  // Viewable queues handler
  useEffect(() => {
    setViewableQueues(fetchedData);
  }, [fetchedData]); // [fetchedData]

  const getFilteredQueues = (searchWord: string, viewableQueues: [] | GetQueueInterface[]): [] | GetQueueInterface[] => {
    let list: GetQueueInterface[] = [];
    if (viewableQueues.length > 0) {
      viewableQueues.forEach((value) => {
        if (
          value.description.toUpperCase().includes(searchWord.toUpperCase())                                // Search through descriptions
        ) {
          list.push(value);
        }
      });
    }
    return list;
  };

  useEffect(() => {
    if (searchWord === '') {
      setFilteredQueueList(sortFirstName(viewableQueues));
    } else {
      setFilteredQueueList(sortFirstName(getFilteredQueues(searchWord, viewableQueues)));
    }
  }, [searchWord, viewableQueues]);

  const setSearch = (props: InputBaseComponentProps) => {
    setSearchWord(props.target.value);
  };

  // Alphabetic sorting on the first name
  const sortFirstName = (array: GetQueueInterface[]) => {
    return array.sort(function (a, b) {
      let x = a.description.toLowerCase();
      let y = b.description.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  };

  const queueChoosingHandler = (queue: GetQueueInterface) => {
    props.setSelectedQueue(queue);
  };


  return (
    <React.Fragment>
      <AppSearchBar searchWord={searchWord} setSearchWord={setSearch} title={'Køer'} />
      {
        <AutoSizer disableHeight={true}>
          {({ width }) => (
            <List
              width={width}
              height={props.height}
              rowCount={filteredQueueList.length}
              rowHeight={45}
              rowRenderer={({ key, index, style }: ListRowProps) => {

                return (
                  <div style={style} key={key}>
                    <Queue
                      queue={filteredQueueList[index]}
                      selectQueueHandler={queueChoosingHandler}
                    />
                  </div>
                );
              }

              }
            />
          )}</AutoSizer>

      }
    </React.Fragment>
  );
};

export default QueueList;
