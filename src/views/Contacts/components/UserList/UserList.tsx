import React, { useEffect, useState } from 'react';
import { getUsers, get1600FakeUsers } from 'hooks/users';
import User from './User/User';
import './UserList.css';
import { AutoSizer, List } from 'react-virtualized';
import { getUserGroups } from 'hooks/userGroups';
import { Table } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Portlet from '../../../../components/Portlet';
import PortletHeader from '../../../../components/PortletHeader';
import Input from '@material-ui/core/Input';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

interface UserInterface {
  presence: {
    suggestedIconDescription: string,
    statusName: string,
  },
  userID: number,
  firstName: string,
  lastName: string,
}

const UserList = () => {

  // const [, fetchedData] = getUsers('papa', []);
  const [, fetchedData] = get1600FakeUsers('papa', []);
  const [viewableUsers, setViewableUsers] = useState<[] | UserInterface[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<[] | UserInterface[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>('');
  const [viewWidth, setViewWidth] = useState<number>(0);

  const [, fetchedUserGroups] = getUserGroups('papa', []); // This is needed for autocompletion

  useEffect(() => {
    console.log(fetchedUserGroups);
  }, [fetchedUserGroups]);

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

  const getFilteredUsers = (searchWord: string, viewableUsers: [] | UserInterface[]): [] | UserInterface[] => {

    let list: UserInterface[] = [];

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
  const sortFirstName = (array:UserInterface[]) => {
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

    if (searchedWord === '') {
      setFilteredUserList(sortFirstName(viewableUsers));
    } else {
      setFilteredUserList(sortFirstName(getFilteredUsers(searchedWord, viewableUsers)));
    }

  }, [searchedWord, viewableUsers]);

  const setSearch = (searchWord: string) => {
    setSearchedWord(searchWord);
  };

  const userList = localStorage.getItem('userList');

  return (
    <Portlet>
      <PortletHeader>
        <i className="fa fa-address-book fa-lg"/>
        Medarbejdere
        <Input className={'search'} placeholder='Search...'/>
      </PortletHeader>
      <Table key={'Coworkers'}>
        <TableHead>
          <TableRow>
            <TableCell>test</TableCell>
            <TableCell>test2</TableCell>
          </TableRow>
        </TableHead>
          {(userList !== null) ? (JSON.parse(userList).length < 1 ?
              (<TableBody>Loading</TableBody>) : // Check if there is found any userList in the local storage and decide if loading screen is showed..
              (<AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <List
                      height={600}
                      width={width}
                      rowHeight={90}
                      rowCount={filteredUserList.length}

                      rowRenderer={
                        ({
                           key,         // Unique key within array of rows
                           index,       // Index of row within collection
                           style        // Style object to be applied to row (to position it)
                         }) =>
                          <User
                            key={key}
                            user={filteredUserList[index]}
                            style={style}
                          />
                      }
                    />
                  );

                }}
              </AutoSizer>)
          ) : (null)

          }
      </Table>
    </Portlet>
  );
};

export default React.memo(UserList);
