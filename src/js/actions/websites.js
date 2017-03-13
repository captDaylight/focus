export const ADD_WEBSITE = 'ADD_WEBSITE';
export function reduxAddWebsite(url, favicon) {
  return {
    type: ADD_WEBSITE,
    url,
    favicon,
  };
}

export function addWebsite(url, favicon) {
  return (dispatch, getState) => {
    const { user: { id } } = getState();
    dispatch(reduxAddWebsite(url, favicon));
    fetch(`${process.env.API_URL}api/website`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        UserId: id,
        urls: [url],
      }),
    })
    .then(res => res.json())
    .then((res) => {
      console.log('websites', res);
    });
  };
}

export const REMOVE_WEBSITE = 'REMOVE_WEBSITE';
export function removeWebsite(url) {
  return {
    type: REMOVE_WEBSITE,
    url,
  };
}

export const TOGGLE_SHOW_SITES = 'TOGGLE_SHOW_SITES';
export function toggleShowSites() {
  return {
    type: TOGGLE_SHOW_SITES,
  };
}

function times(fn, timesLeft) {
  if (timesLeft > 0) {
    return fn(timesLeft);
  }
  return;
}

export function checkForTab(url, id, favicon) {
  return (dispatch) => {
    dispatch(addWebsite(url, favicon));
    if (!favicon) {
      const timeOut = (count) => {
        setTimeout(() => {
          chrome.tabs.get(id, (tab) => {
            const { favIconUrl } = tab;
            if (favIconUrl) {
              dispatch(addWebsite(url, favIconUrl));
            } else {
              times(timeOut, count - 1);
            }
          });
        }, 500);
      };

      times(timeOut, 10);
    }
  };
}
