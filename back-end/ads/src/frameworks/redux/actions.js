/* 
 *
 *  Redux action
 *
 */

module.exports = {
  
  saveRedditObj: (obj) => {

    return {
      type: 'STORE_RABBIT_OBJ',
      payload: obj
    }
  },
};