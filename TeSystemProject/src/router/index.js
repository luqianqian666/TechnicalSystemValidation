import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import missionControlInfo from '@/components/taskManage/missionControl/missionControlInfo'
import taskDetail from '@/components/taskManage/missionControl/taskDetail'
import taskBaseInfo from '@/components/taskManage/verifyPerform/taskBaseInfo'
import taskResultsManage from '@/components/taskManage/taskResult/taskResultsManage'
import testCaseEdit from '@/components/taskManage/missionControl/testCaseEdit'
import leftBar from '@/components/leftBar'
import standardsManageInfo from '@/components/taskManage/standardsManage/standardsManageInfo'
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
     {
       path: '/',
      //  redirect: 'taskBaseInfo',
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
      {
        path: '/taskBaseInfo',
        name: 'taskBaseInfo', 
        component: taskBaseInfo
      },
      
      {
        path: '/taskDetail',
        name: 'taskDetail',
        component: taskDetail
      },
      {
        path: '/testCaseEdit',
        name: 'testCaseEdit',
        component: testCaseEdit
      },
      
      {
        path: '/standardsManageInfo',
        name: 'standardsManageInfo',
        component: standardsManageInfo
      },
   /* {
      path: '/',
      name: 'taskBaseInfo',
      component: taskBaseInfo,
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
}*/
],
// mode:"history"    // mode 设置为history ，去掉地址栏上的 # 号
})
