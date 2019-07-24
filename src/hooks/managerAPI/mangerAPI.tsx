import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';

const baseURL = 'https://api.everconnect.dk/manager/v1';

const defaultConfig = (request: AxiosRequestConfig) => {

  let returnData: AxiosRequestConfig = {};
  returnData.headers = {};

  request.timeout = 5000;

  return request;
};

export const ManagerAPIPost = (url: string, data: object, request: AxiosRequestConfig, dependencies: []) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.post(baseURL + url, data, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading as boolean, fetchedData as any];

};

export const ManagerAPIGet = (url: string, request: AxiosRequestConfig, dependencies: []) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData]:any = useState();

  useEffect(() => {
    setIsLoading(true);
    axios.get(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchedData];

};

export const ManagerAPIPut = (url: string, request: AxiosRequestConfig, dependencies: []) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.put(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading as boolean, fetchedData as any];

};

export const ManagerAPIPatch = (url: string, data: object, request: AxiosRequestConfig, dependencies: []) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.patch(baseURL + url, data, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading as boolean, fetchedData as any];

};
