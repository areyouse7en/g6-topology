import G6 from '@antv/g6';

// 自定义节点、边
const registerFn = () => {
  /**
   * 自定义节点
   */
  G6.registerNode(
    'vm',
    {
      options: {},
      draw(cfg: PlainObject, group) {
        console.log(cfg);
        const { label, style: { width = 0, height = 0 } = {} } = cfg;
        // 背景
        const rectCfg = {
          width,
          height,
          fill: '#fff',
          radius: 2,
        };
        // key shape
        const keyShape = group!.addShape('rect', {
          attrs: {
            x: -rectCfg.width / 2,
            y: -rectCfg.height / 2,
            ...rectCfg,
          },
        });
        // 文字
        const textCfg = {
          fontSize: 14,
          textBaseline: 'middle',
        };
        group!.addShape('text', {
          attrs: {
            x: 0, // 居中
            y: -rectCfg.height / 2 + 72,
            textAlign: 'center',
            text: label,
            fill: '#1A2736',
            fontWeight: 600,
            overFlow: 'hidden',
            ...textCfg,
          },
        });
        return keyShape;
      },
    },
    'rect',
  );

  G6.registerNode('port', {
    options: {},
    draw(cfg: PlainObject, group) {
      const { label, style: { width = 0, height = 0 } = {} } = cfg;
      // 背景
      const rectCfg = {
        width,
        height,
        fill: '#fff',
        radius: 2,
      };
      // key shape
      const keyShape = group!.addShape('rect', {
        attrs: {
          x: -rectCfg.width / 2,
          y: -rectCfg.height / 2,
          ...rectCfg,
        },
      });
      // 文字
      const textCfg = {
        fontSize: 14,
        textBaseline: 'middle',
      };
      group!.addShape('text', {
        attrs: {
          x: -rectCfg.width / 2 + 24,
          y: -rectCfg.height / 2 + 30,
          text: '端口：',
          fill: '#1A2736',
          ...textCfg,
        },
      });
      group!.addShape('text', {
        attrs: {
          x: -rectCfg.width / 2 + 68,
          y: -rectCfg.height / 2 + 30,
          text: label,
          fill: '#1A2736',
          ...textCfg,
        },
      });
      return keyShape;
    },
  });
};

export default registerFn;
