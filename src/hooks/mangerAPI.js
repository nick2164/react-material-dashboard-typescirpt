import axios from "axios";
import React, {useState, useEffect} from 'react';

const baseURL = 'https://api.everconnect.dk/manager/v1';

const defaultConfig = (request) => {

  let returnData = {};
  returnData.headers = {};

  request.timeout = 5000;

  return request;
};

export const ManagerAPIPost = (url, data , request) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.post(baseURL + url, data, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, []);

  return [isLoading, fetchedData];

};

export const ManagerAPIGet = (url, request, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

};

export const ManagerAPIPut = (url, request) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.put(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, []);

  return [isLoading, fetchedData];

};

export const ManagerAPIPatch = (url, data, request) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.patch(baseURL + url, data, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, []);

  return [isLoading, fetchedData];

};
