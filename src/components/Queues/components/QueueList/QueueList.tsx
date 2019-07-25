import { AppSearchBar } from 'components/index';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import Queue from './components/Queue/Queue';
import React, { useEffect, useState } from 'react';
import { get160FakeQueues, GetQueueInterface } from '../../../../hooks/managerAPI/queues';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

interface QueueListInterface {
  setSelectedQueue: (queue: GetQueueInterface) => void,
  height: number
}

const QueueList = (props: QueueListInterface) => {

  // const [, fetchedData] = getQueues('papa', []);
  const fetchedData = get160FakeQueues('papa', []);
  const [viewableQueues, setViewableQueues] = useState<GetQueueInterface[]>([]);
  const [filteredQueueList, setFilteredQueueList] = useState<GetQueueInterface[]>([]);
  const [searchWord, setSearchWord] = useState('');

  // Viewable queues handler
  useEffect(() => {
    const queueList = localStorage.getItem('queueList');
    if (queueList !== null) {
      setViewableQueues(JSON.parse(queueList));
      if (fetchedData.length > 0) {
        if (JSON.parse(queueList).length < 1) {
          localStorage.setItem('queueList', JSON.stringify(fetchedData));
          setViewableQueues(JSON.parse(queueList));
        } else {
          if (localStorage.getItem('queueList') !== JSON.stringify(fetchedData)) {
            localStorage.setItem('queueList', JSON.stringify(fetchedData));
            setViewableQueues(JSON.parse(queueList));
          }
        }
      }
    }
  }, []); // [fetchedData]

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

  const queueList = localStorage.getItem('queueList');

  // Alphabetic sorting on the first name
  const sortFirstName = (array: GetQueueInterface[]) => {
    return array.sort(function(a, b) {
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
      <AppSearchBar searchWord={searchWord} setSearchWord={setSearch} title={'Køer'}/>
      {
        (queueList !== null) ? (JSON.parse(queueList).length < 1 ?
            (<p>Loading</p>) : // Check if there is found any queueList in the local storage and decide if loading screen is showed..
            (<AutoSizer disableHeight={true}>
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
            )
        ) : null
      }
    </React.Fragment>
  );
};

export default QueueList;