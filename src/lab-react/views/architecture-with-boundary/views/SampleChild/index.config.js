import { useConfig } from '../default.config';
// import { Skeleton, Failed, Loading } from './index.fallbacks'
import FamilyRecommend from './index.view'

const fetchFamilyRecommendData = async () => {
  let response= await new Promise(res => {
    setTimeout(()=>res('[response content]'), 3000);
  })
  return response;
}

const config = useConfig({
  Template: FamilyRecommend,
  templateCode: 'Sample-Child',

  fetchData: fetchFamilyRecommendData,
})
export default config;