import React from 'react';
import { FullScreenLoading } from './Loading/FullScreenLoading';

export const Container = ({ width, height, cols, rows, colSpan, rowSpan, rowStart, colStart, children }) => {
  return (
    <div className={`w-${width ? width : 0} h-${height ? height : 0} grid grid-cols-${cols ? cols : 0} grid-rows-${rows ? rows : 0} col-start-${colStart ? colStart : 0} col`} style={{ gridColumn: `${colStart ? colStart : 1} / span ${colSpan ? colSpan : 1}`, gridRow: `${rowStart ? rowStart : 1} / span ${rowSpan ? rowSpan : 1}` }}>
      {children}
    </div>
  );
};

