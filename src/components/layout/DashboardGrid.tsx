import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import type { Layout, ResponsiveLayouts } from 'react-grid-layout';
import type { ReactNode } from 'react';
import { useLayout } from '../../context/LayoutContext';
import { GRID_BREAKPOINTS, GRID_COLS } from '../../constants/defaultLayouts';
import 'react-grid-layout/css/styles.css';

type ModuleId = 'dashboard' | 'analytics';

interface DashboardGridProps {
  moduleId: ModuleId;
  children: ReactNode;
}

export function DashboardGrid({ moduleId, children }: DashboardGridProps) {
  const { layouts, setModuleLayouts, isCustomizing } = useLayout();
  const { width, containerRef } = useContainerWidth();

  function handleLayoutChange(_layout: Layout, allLayouts: ResponsiveLayouts) {
    setModuleLayouts(moduleId, allLayouts);
  }

  return (
    <div ref={containerRef} className="w-full">
      <ResponsiveGridLayout
        className="layout"
        width={width}
        layouts={layouts[moduleId]}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLS}
        rowHeight={60}
        dragConfig={{ enabled: isCustomizing, handle: '.drag-handle' }}
        resizeConfig={{ enabled: isCustomizing, handles: ['se'] }}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
}
