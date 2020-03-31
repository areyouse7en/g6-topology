import { v4 } from 'uuid';
export default {
  'GET /api/vm': {
    data: {
      id: v4(),
      label: 'root',
      children: [{
        id: v4(),
        label: 'vm1',
        children: [{
          id: v4(),
          label: '8000'
        }, {
          id: v4(),
          label: '8200'
        }]
      }, {
        id: v4(),
        label: 'vm2',
        children: [{
          id: v4(),
          label: '8080'
        }, {
          id: v4(),
          label: '8200'
        }]
      }]
    }
  }
}