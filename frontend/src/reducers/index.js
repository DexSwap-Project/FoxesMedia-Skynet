
import { reducer } from 'easy-peasy'; 
import user from "./user";
import feed from "./feed";
import video from "./video";
import profile from "./profile";
import sidebar from "./sidebar";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";
import searchResult from "./searchResult";
import trending from "./trending";
import likedVideo from "./likedVideo";
import history from "./history";
import mySkyModel from "./mySkyModel";
import hnsModel  from './hnsModel';

const Model = {
  mySky:mySkyModel,
  hns: hnsModel,
  user: reducer(user),
  feed:reducer(feed),
  video:reducer(video),
  profile:reducer(profile),
  sidebar:reducer(sidebar),
  recommendation:reducer(recommendation),
  channelRecommendation:reducer(channelRecommendation),
  searchResult:reducer(searchResult),
  trending:reducer(trending),
  likedVideo:reducer(likedVideo),
  history:reducer(history)
};

export default Model;