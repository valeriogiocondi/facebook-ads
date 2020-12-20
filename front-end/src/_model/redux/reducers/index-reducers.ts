import { combineReducers } from 'redux'
import mapLayersReducers from './map-layers-reducers'
import changeLegendLayerReducers from './change-legend-layer-reducers'
import projectionsReducers from './projections-reducers'

const reducers = combineReducers({

  mapLayers: mapLayersReducers,
  changeLegendLayer: changeLegendLayerReducers,
  projections: projectionsReducers,
});

export default reducers;