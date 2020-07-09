import { useConfig } from '../default.config';
// import { Skeleton, Failed, Loading } from './index.fallbacks'
import { Skeleton } from './fallbacks'
import View from './index.view'

const fetchFamilyRecommendData = async () => {
  let response= await new Promise(res => {
    setTimeout(()=>res('[another response content]'), Math.random() * 5000 + 1000);
  })
  return response;
}

const config = useConfig({
  Template: View,
  template: View,
  skeleton: View,
  templateCode: 'Custom-Boundary-Child',

  fetchData: fetchFamilyRecommendData,

  Skeleton: Skeleton,
  Failed: Skeleton,
  Loading: Skeleton,
})
export default config;