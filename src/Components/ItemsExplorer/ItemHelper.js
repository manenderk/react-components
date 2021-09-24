const ItemHelper = {
  getSubitems: async (url) => {
    try {
      if (!url) {
        return;
      }
      const resp = await fetch(url, {
        cache: 'no-cache'
      });
      const data = await resp.json();
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }    
  },

  getTitle: (item, titleDisplayKeys) => {
    let title = [];
    titleDisplayKeys.forEach(t => {
      if (item[t]) {
        title.push(item[t]);
      }
    });
    return title.join(' - ');
  },

  itemHasDetails: (item, detailsDisplayKeys) => {
    if (!item || !detailsDisplayKeys || detailsDisplayKeys.length === 0) {
      return false;
    }

    let hasDetails = false;
    for(let i = 0; i < detailsDisplayKeys.length; i++) {
      if (item[detailsDisplayKeys[i]]) {
        hasDetails = true;
        break;
      }
    }
    return hasDetails;
  }
}

export default ItemHelper;