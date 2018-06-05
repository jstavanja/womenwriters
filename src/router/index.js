import Vue from 'vue'
import Router from 'vue-router'
import Visualization from '@/components/Visualization'
import Welcome from '@/components/Welcome'
import QuestionsList from '@/components/Pages/QuestionsList'
import AboutAuthors from '@/components/Pages/AboutAuthors'

// Questions

import HowManyWomen from '@/components/Questions/HowManyWomen'
import CompareNorwegianLiteraryScene from '@/components/Questions/CompareNorwegianLiteraryScene'
import HowManyTranslations from '@/components/Questions/HowManyTranslations'
import InvestigateEuropeanReception from '@/components/Questions/InvestigateEuropeanReception'
import ShowThe10Or20 from '@/components/Questions/ShowThe10Or20'
import TimelineOfImport from '@/components/Questions/TimelineOfImport'
import WereReadAbroad from '@/components/Questions/WereReadAbroad'
import WhichCountriesExported from '@/components/Questions/WhichCountriesExported'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Welcome,
    },
    {
      path: '/visualization',
      component: Visualization,
      children: [
        {
          path: 'howmanywomen',
          component: HowManyWomen
        },
        {
          path: 'comparenorwegianliteraryscene',
          component: CompareNorwegianLiteraryScene
        },
        {
          path: 'howmanytranslations',
          component: HowManyTranslations
        },
        {
          path: 'investigateeuropeanreception',
          component: InvestigateEuropeanReception
        },
        {
          path: 'showthe10or20',
          component: ShowThe10Or20
        },
        {
          path: 'timelineofimport',
          component: TimelineOfImport
        },
        {
          path: 'werereadabroad',
          component: WereReadAbroad
        },
        {
          path: 'whichcountriesexported',
          component: WhichCountriesExported
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
