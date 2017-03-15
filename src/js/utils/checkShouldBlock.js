import { findIndex } from 'lodash';

export default function checkShouldBlock(urlData) {
  return (sites) => {
    const shouldBlock = findIndex(sites, site => urlData.href.indexOf(site.url) > -1) >= 0;
    return shouldBlock;
  };
}
