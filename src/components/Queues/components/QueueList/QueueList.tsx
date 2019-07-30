import { AppSearchBar } from 'components/index';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import Queue from './components/Queue/Queue';
import React, { useEffect, useRef, useState } from 'react';
import { GetQueueInterface, getQueues, queuePlaceholder } from '../../../../hooks/managerAPI/queues';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

interface QueueListInterface {
  setSelectedQueue: (queue: GetQueueInterface) => void,
  height: number
}

const QueueList = (props: QueueListInterface) => {

  const fetchedData = getQueues('nboatevercall', []);
  // const fetchedData = get160FakeQueues('papa', []);
  const [viewableQueues, setViewableQueues] = useState<GetQueueInterface[]>([]);
  const [filteredQueueList, setFilteredQueueList] = useState<GetQueueInterface[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [localStorageCounter, setLocalStorageCounter] = useState(0);

  const fetchedQueues = useRef([queuePlaceholder]);
  fetchedQueues.current = fetchedData;

  const viewableQueuesHandler = () => {
    setLocalStorageCounter(0);
    if(fetchedQueues.current.length !== undefined) {
      fetchedQueues.current.map(queue => {
        const queueList = localStorage.getItem(`queue${queue.queueID}List`);
        setLocalStorageCounter(localStorageCounter + 1);
        if (queueList !== null) {
          setViewableQueues(JSON.parse(queueList));
          if (fetchedQueues.current.length > 0) {
            if (JSON.parse(queueList).length < 1) {
              localStorage.setItem(`queue${queue.queueID}List`, JSON.stringify(fetchedQueues.current));
              setViewableQueues(JSON.parse(queueList));
            } else {
              if (localStorage.getItem(`queue${queue.queueID}List`) !== JSON.stringify(fetchedQueues.current)) {
                localStorage.setItem(`queue${queue.queueID}List`, JSON.stringify(fetchedQueues.current));
                setViewableQueues(JSON.parse(queueList));
              }
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    viewableQueuesHandler();
  }, [fetchedData]); // Fetched data


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
        (localStorageCounter < 1 ?
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
        )
      }
    </React.Fragment>
  );
};

export default QueueList;