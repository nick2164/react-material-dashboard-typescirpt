import React, { useEffect, useState } from 'react';
import './QueueList.css';
import { AppSearchBar } from 'components/index';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import Queue from './Queue/Queue';
import { get160FakeQueues, GetQueueInterface } from '../../../../hooks/managerAPI/queues';
import { createStyles, Grid, GridList, ListSubheader, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { InfiniteLoader, List, ListRowProps } from 'react-virtualized';
import QueueMemberTable from './QueueMemberTable/QueueMemberTable';

interface QueueListInterface {
  height: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      width: '100%'
    },
    listView: {
      width: '30%'
    },
    tableView: {
      width: '70%'
    }
  })
);

const QueueList = (props: QueueListInterface) => {

  const classes = useStyles();

  // const [, fetchedData] = getQueues('papa', []);
  const [fetchedData] = get160FakeQueues('papa', []);
  const [viewableQueues, setViewableQueues] = useState<GetQueueInterface[]>([]);
  const [filteredQueueList, setFilteredQueueList] = useState<GetQueueInterface[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedQueue, setSelectedQueue] = useState<GetQueueInterface>(
    {
      description: '',
      queueID:0,
      calls: {
        averageHoldTime: 0,
        callerCount:0,
        longestHoldTime:0,
        totalTalkTime:0
      },
      members:[],
      settings: {
        ringTime:0,
        timeout:0
      }
    }
  );

  const queueChoosingHandler = (queue: GetQueueInterface) => {
    setSelectedQueue(queue);
  };

  if (localStorage.getItem('queueList') === null) {
    localStorage.setItem('queueList', JSON.stringify([]));
  }

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

  return (
    <Paper>
      <AppSearchBar searchWord={searchWord} setSearchWord={setSearch} title={'Køer'}/>
      <Grid container={true} className={classes.root}>
        <Grid item={true} className={classes.listView}>
          {(queueList !== null) ? (JSON.parse(queueList).length < 1 ?
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
        </Grid>
        <Grid component={'div'} item={true} className={classes.tableView}>
          <QueueMemberTable queueMembers={selectedQueue.members}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(QueueList);
