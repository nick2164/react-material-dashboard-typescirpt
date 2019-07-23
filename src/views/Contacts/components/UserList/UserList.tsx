import React, { useEffect, useState } from 'react';
import { get1600FakeUsers, GetUserInterface } from 'hooks/managerAPI/users';
import User from './User/User';
import './UserList.css';
import { AutoSizer, List } from 'react-virtualized';
import { Paper } from '@material-ui/core';
import SearchAppBar from './Components/SearchAppBar';
import { InputBaseComponentProps, InputBaseProps } from '@material-ui/core/InputBase';

interface UserListInterface {
  height: number
}

const UserList = (props: UserListInterface) => {

  // const [, fetchedData] = getUsers('papa', []);
  const [fetchedData] = get1600FakeUsers('papa', []);
  const [viewableUsers, setViewableUsers] = useState<[] | GetUserInterface[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<[] | GetUserInterface[]>([]);
  const [searchWord, setSearchWord] = useState('');


  if (localStorage.getItem('userList') === null) {
    localStorage.setItem('userList', JSON.stringify([]));
  }

  // Viewable users handler
  useEffect(() => {
    const userList = localStorage.getItem('userList');

    if (userList !== null) {

      setViewableUsers(JSON.parse(userList));

      if (fetchedData.length > 0) {

        if (JSON.parse(userList).length < 1) {

          localStorage.setItem('userList', JSON.stringify(fetchedData));

          setViewableUsers(JSON.parse(userList));

        } else {

          if (localStorage.getItem('userList') !== JSON.stringify(fetchedData)) {

            localStorage.setItem('userList', JSON.stringify(fetchedData));

            setViewableUsers(JSON.parse(userList));

          }
        }

      }

    }

  }, []); // [fetchedData]

  const getFilteredUsers = (searchWord: string, viewableUsers: [] | GetUserInterface[]): [] | GetUserInterface[] => {

    let list: GetUserInterface[] = [];

    if (viewableUsers.length > 0) {

      viewableUsers.forEach((value) => {
        if (
          value.firstName.toUpperCase().includes(searchWord.toUpperCase()) ||                                     // Search through firstname
          value.lastName.toUpperCase().includes(searchWord.toUpperCase()) ||                                      // Search through lastname
          (value.firstName.toUpperCase() + ' ' + value.lastName.toUpperCase()).includes(searchWord.toUpperCase()) // Search through firstname and lastname
        ) {
          list.push(value);
        }
      });

    }

    return list;

  };

  // Alphabetic sorting on the first name
  const sortFirstName = (array: GetUserInterface[]) => {
    return array.sort(function(a, b) {
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
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
      setFilteredUserList(sortFirstName(viewableUsers));
    } else {
      setFilteredUserList(sortFirstName(getFilteredUsers(searchWord, viewableUsers)));
    }

  }, [searchWord, viewableUsers]);

  const setSearch = (props: InputBaseComponentProps) => {
    console.log(props.target.value);

    setSearchWord(props.target.value);
  };

  const userList = localStorage.getItem('userList');

  return (
    <Paper>
      <SearchAppBar searchWord={searchWord} setSearchWord={setSearch} title={'Kontakter'}/>
      {(userList !== null) ? (JSON.parse(userList).length < 1 ?
          (<p>Loading</p>) : // Check if there is found any userList in the local storage and decide if loading screen is showed..
          (<AutoSizer disableHeight={true}>
            {({ width }) => {
              return (
                <List
                  height={props.height}
                  width={width * 0.3}
                  rowHeight={65}
                  rowCount={filteredUserList.length}
                  rowRenderer={
                    ({
                       key,         // Unique key within array of rows
                       index,       // Index of row within collection
                       style        // Style object to be applied to row (to position it)
                     }) =>
                      <div style={style} key={key}>
                        <User
                          user={filteredUserList[index]}
                        />
                      </div>
                  }
                />
              );
            }}
          </AutoSizer>)
      ) : (null)
      }
    </Paper>
  );
};

export default React.memo(UserList);
