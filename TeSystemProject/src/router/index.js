import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import missionControlInfo from '@/components/taskManage/missionControl/missionControlInfo'
import taskBaseInfo from '@/components/taskManage/verifyPerform/taskBaseInfo'
import taskResultsManage from '@/components/taskManage/taskResult/taskResultsManage'
import leftBar from '@/components/leftBar'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/missionControlInfo',
      name: 'missionControlInfo',
      component: missionControlInfo
    },
    {
      path: '/taskBaseInfo',
      name: 'taskBaseInfo',
      component: taskBaseInfo
    },
    {
      path: '/taskResultsManage',
      name: 'taskResultsManage',
      component: taskResultsManage
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
      {
        path: '/taskBaseInfo',
        name: 'taskBaseInfo',
        component: taskBaseInfo
      },
      {
        path: '/missionControlInfo',
        name: 'missionControlInfo',
        component: missionControlInfo
      },
      {
        path: '/taskResultsManage',
        name: 'taskResultsManage',
        component: taskResultsManage
      },
    
  ]
}
]
})
