import Vue from 'vue';

import yuContainer from './yu-container';

// 注意 有些组件使用异步加载会有影响
Vue.component('yu-container', yuContainer);
Vue.component('yu-icon', () => import('./yu-icon'));
