import React, { SFC, useRef, useState, useEffect } from 'react';
import { useRequest } from 'umi';
import { TreeGraph } from '@antv/g6';
import style from './style.less';

const Index: SFC = () => {
  const [graph, setGraph] = useState<TreeGraph>()
  const ref = useRef<HTMLDivElement>(null);
  const { data, error, loading } = useRequest('/api/vm');

  // 初始化图形
  const initGraph = () => {
    const container = ref.current;
    if (!graph && container) {
      const width = container.scrollWidth;
      const height = container.scrollHeight;
      const _graph = new TreeGraph({
        container,
        width,
        height,
        modes: {
          default: ["drag-canvas", "zoom-canvas"]
        },
        defaultNode: {
          type: "rect",
          size: [200, 100],
          anchorPoints: [[0.5, 0], [0.5, 1]],
          style: {
            opacity: 0.3
          }
        },
        defaultEdge: {
          type: "cubic-vertical",
          style: {
            stroke: "#A3B1BF"
          }
        },
        layout: {
          type: "compactBox",
          direction: "TB",
          getVGap: function getVGap() {
            return 50;
          },
          getHGap: function getHGap() {
            return 100;
          }
        }
      })

      _graph.data(data);
      _graph.render();
      _graph.fitView();
      setGraph(_graph);
    }
  }

  useEffect(() => {
    initGraph();
  }, [data]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div ref={ref} className={style.container} />
  );
}

export default Index;

