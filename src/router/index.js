import Vue from 'vue'
import Router from 'vue-router'
import Visualization from '@/components/Visualization'
import Welcome from '@/components/Welcome'
import QuestionsList from '@/components/Pages/QuestionsList'
import AboutAuthors from '@/components/Pages/AboutAuthors'
import HowManyWomen from '@/components/Questions/HowManyWomen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Visualization,
      children: [
        {
          path: '',
          component: Welcome
        },
        {
          path: 'howmanywomen',
          component: HowManyWomen
        }
      ]
    },
    {
      path: '/questions',
      name: 'QuestionsList',
      component: QuestionsList
    },
    {
      path: '/authors',
      name: 'AboutAuthors',
      component: AboutAuthors
    }
  ]
})
