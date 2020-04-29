import React, { SFC, useRef, useState, useEffect } from 'react';
import { useRequest } from 'umi';
import { TreeGraph, Grid } from '@antv/g6';
import style from './style.less';
import { IG6GraphEvent } from '@antv/g6/lib/types';
import registerFn from '@/utils/register';

registerFn();

const Index: SFC = () => {
  const [graph, setGraph] = useState<TreeGraph>();
  const ref = useRef<HTMLDivElement>(null);
  const { data, error, loading } = useRequest('/api/vm');

  // 初始化图形
  const initGraph = () => {
    const container = ref.current;
    if (!graph && container) {
      const width = container.scrollWidth;
      const height = container.scrollHeight;
      const grid = new Grid();
      const _graph = new TreeGraph({
        container,
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          type: 'rect',
          style: {
            cursor: 'pointer',
          },
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
        },
        defaultEdge: {
          type: 'cubic-vertical',
          style: {
            stroke: '#A3B1BF',
          },
        },
        nodeStateStyles: {
          hover: {
            shadowColor: 'rgba(0,84,147,0.1)',
            shadowBlur: 10,
          },
        },
        layout: {
          type: 'compactBox',
          direction: 'TB',
          getWidth(node: PlainObject) {
            if (node.children) {
              return 250;
            } else {
              return 140;
            }
          },
          getHeight(node: PlainObject) {
            if (node.children) {
              return 200;
            } else {
              return 90;
            }
          },
          getVGap(node: PlainObject) {
            return 20;
          },
          getHGap(node: PlainObject) {
            if (node.children) {
              return 36;
            } else {
              return 91;
            }
          },
        },
        plugins: [grid],
      });

      // 启用状态
      _graph.on('node:mouseenter', (e: IG6GraphEvent) => {
        const { item } = e;
        _graph.setItemState(item!, 'hover', true);
      });

      _graph.on('node:mouseleave', (e: IG6GraphEvent) => {
        const { item } = e;
        _graph.setItemState(item!, 'hover', false);
      });

      _graph.node(function(node) {
        const { depth } = node;
        let style = {};
        if (depth === 1) {
          style = {
            width: 250,
            height: 200,
          };
        } else if (depth === 2) {
          style = {
            width: 140,
            height: 90,
          };
        }
        return {
          style,
        };
      });

      _graph.data(data);
      _graph.render();
      _graph.fitView();
      setGraph(_graph);
    }
  };

  useEffect(() => {
    if (data) {
      initGraph();
    }
  }, [data]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return <div ref={ref} className={style.container} />;
};

export default Index;
