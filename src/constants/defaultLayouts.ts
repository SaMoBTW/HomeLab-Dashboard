import type { ResponsiveLayouts } from 'react-grid-layout';

export const DEFAULT_DASHBOARD_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: 'stats', x: 0, y: 0, w: 12, h: 3, minW: 4, minH: 2 },
    { i: 'links', x: 0, y: 3, w: 12, h: 6, minW: 4, minH: 4 },
  ],
  md: [
    { i: 'stats', x: 0, y: 0, w: 10, h: 3, minW: 4, minH: 2 },
    { i: 'links', x: 0, y: 3, w: 10, h: 6, minW: 4, minH: 4 },
  ],
  sm: [
    { i: 'stats', x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 2 },
    { i: 'links', x: 0, y: 4, w: 6, h: 6, minW: 4, minH: 4 },
  ],
  xs: [
    { i: 'stats', x: 0, y: 0, w: 4, h: 5, minW: 2, minH: 2 },
    { i: 'links', x: 0, y: 5, w: 4, h: 8, minW: 2, minH: 4 },
  ],
};

export const DEFAULT_ANALYTICS_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: 'cpu-temp', x: 0, y: 0, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'ram-load', x: 6, y: 0, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'network', x: 0, y: 5, w: 12, h: 5, minW: 4, minH: 3 },
  ],
  md: [
    { i: 'cpu-temp', x: 0, y: 0, w: 5, h: 5, minW: 3, minH: 3 },
    { i: 'ram-load', x: 5, y: 0, w: 5, h: 5, minW: 3, minH: 3 },
    { i: 'network', x: 0, y: 5, w: 10, h: 5, minW: 4, minH: 3 },
  ],
  sm: [
    { i: 'cpu-temp', x: 0, y: 0, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'ram-load', x: 0, y: 5, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'network', x: 0, y: 10, w: 6, h: 5, minW: 4, minH: 3 },
  ],
  xs: [
    { i: 'cpu-temp', x: 0, y: 0, w: 4, h: 5, minW: 2, minH: 3 },
    { i: 'ram-load', x: 0, y: 5, w: 4, h: 5, minW: 2, minH: 3 },
    { i: 'network', x: 0, y: 10, w: 4, h: 5, minW: 2, minH: 3 },
  ],
};

export const GRID_BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480 };
export const GRID_COLS = { lg: 12, md: 10, sm: 6, xs: 4 };
