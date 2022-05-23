import axios from 'axios';
import { EventsServiceFastlyApi } from '..';
import { SearchEngineApi } from '../Enpoinst';

export const getEvents = async () => {
  try {
    console.log("Get Eventis");
    const resp = await (await SearchEngineApi()).get('search');
    const data = resp.data;
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getDetailEvet = async url => {
  const resp = await axios.get(url);
  const data = resp.data;
  return data;
};

export const getSearchData = async searchData => {
  try {
    const resp = await (await SearchEngineApi()).post('filters', searchData);
    const data = resp.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCategoriesAndGenres = async () => {
  try {
    const resp = await (
      await EventsServiceFastlyApi()
    ).get('EventCategories/with-events-qualifiers');
    const data = resp.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getByCategory = async category => {
  try {
    const resp = await (await SearchEngineApi()).get(`by-category/${category}`);
    const data = resp.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getByCategoryAndGenre = async (category, genre) => {
  try {
    const resp = await (
      await SearchEngineApi()
    ).get(`by-category-genre/${category}/${genre}`);
    console.log(resp);
    const data = resp.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};
