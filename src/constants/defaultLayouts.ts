import type { ResponsiveLayouts } from 'react-grid-layout';

export const DEFAULT_DASHBOARD_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: 'stats', x: 0, y: 0, w: 12, h: 7, minW: 4, minH: 4 },
    { i: 'links', x: 0, y: 7, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'containers', x: 6, y: 7, w: 6, h: 8, minW: 4, minH: 4 },
    { i: 'terminal', x: 0, y: 12, w: 6, h: 8, minW: 4, minH: 4 },
    { i: 'analytics', x: 6, y: 15, w: 6, h: 5, minW: 4, minH: 4 },
  ],
  md: [
    { i: 'stats', x: 0, y: 0, w: 10, h: 7, minW: 4, minH: 4 },
    { i: 'links', x: 0, y: 7, w: 5, h: 5, minW: 3, minH: 3 },
    { i: 'containers', x: 5, y: 7, w: 5, h: 8, minW: 4, minH: 4 },
    { i: 'terminal', x: 0, y: 12, w: 5, h: 8, minW: 4, minH: 4 },
    { i: 'analytics', x: 5, y: 15, w: 5, h: 5, minW: 4, minH: 4 },
  ],
  sm: [
    { i: 'stats', x: 0, y: 0, w: 6, h: 7, minW: 4, minH: 4 },
    { i: 'links', x: 0, y: 7, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'containers', x: 0, y: 12, w: 6, h: 8, minW: 4, minH: 4 },
    { i: 'terminal', x: 0, y: 20, w: 6, h: 8, minW: 4, minH: 4 },
    { i: 'analytics', x: 0, y: 28, w: 6, h: 5, minW: 4, minH: 4 },
  ],
  xs: [
    { i: 'stats', x: 0, y: 0, w: 4, h: 8, minW: 2, minH: 4 },
    { i: 'links', x: 0, y: 8, w: 4, h: 6, minW: 2, minH: 3 },
    { i: 'containers', x: 0, y: 14, w: 4, h: 9, minW: 2, minH: 4 },
    { i: 'terminal', x: 0, y: 23, w: 4, h: 9, minW: 2, minH: 4 },
    { i: 'analytics', x: 0, y: 32, w: 4, h: 6, minW: 2, minH: 4 },
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
