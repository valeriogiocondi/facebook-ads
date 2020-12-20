export const storeAllLayersAction = (obj: any) => {
  return {
    type: 'STORE_ALL_LAYERS',
    payload: obj
  }
};

export const changeLegendLayerAction = (obj: any) => {
  return {
    type: 'CHANGE_LEGEND_LAYER',
    payload: obj
  }
};

export const storeProjectionsAction = (obj: any) => {
  return {
    type: 'STORE_PROJECTIONS',
    payload: obj
  }
};

export const showProjectionsAction = (obj: any) => {
  return {
    type: 'SHOW_PROJECTIONS',
    payload: obj
  }
};