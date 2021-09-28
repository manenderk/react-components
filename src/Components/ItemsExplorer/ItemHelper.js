const ItemHelper = {
  getItems: async (url) => {
    try {
      if (!url) {
        throw new Error('URL not provided');
      }
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }    
  },

  getSubitems: async (url) => {
    try {
      if (!url) {
        throw new Error('URL not provided');
      }
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }    
  },

  getTitle: (item, titleDisplayKeys) => {
    if (!item || !titleDisplayKeys) {
      return ''
    }
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
  },

  getItemIcon: (item, levelKey, listLevel1Icon, listLevel2Icon) => {
    if (!item || !levelKey) {
      return '';
    }
    if (item[levelKey] === 0) {
      return listLevel1Icon;
    }
    if (item[levelKey] === 1) {
      return listLevel2Icon;
    }
  }
}

export default ItemHelper;