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
  }
}

export default ItemHelper;