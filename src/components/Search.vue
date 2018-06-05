<template>
  <div class="search">
    <el-popover
      placement="bottom-start"
      trigger="manual"
      width="600"
      :value="searchOpen">
      <el-input
        class="predefined-question-search-input"
        placeholder="Search for a predefined question ..."
        v-model="predefinedQuestionSearchInput"
        slot="reference"
        @focus="searchOpenForce = true"
        @blur="searchOpenForce = false"
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="search-header">
        <img src="../assets/asking.svg" alt="question image" class="search-icon">
        <h3 class="search-title">
          Predefined question search
        </h3>
      </div>
      <div class="no-results" v-if="filteredList.length === 0">
        Sorry, no questions matched your search query.
      </div>
      <ul :class="['questions-list-search', {visible: searchOpen}]" v-else>
        <router-link :to="'/visualization/' + question.path" tag="li" class="question-link animated fadeIn" v-for="(question, idx) in filteredList" :key="idx">
          <div class="results">
            <div class="question-link">
              <i class="el-icon-question"></i>
              <div class="link-title">
                {{ question.title }}
              </div>
            </div>
          </div>
        </router-link>
      </ul>
    </el-popover>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  data() {
    return {
      predefinedQuestionSearchInput: '',
      searchOpenValue: false,
      searchOpenForce: false,
      questions: [
        {
          title: 'How many foreign women writers were read in Norway before 1930?',
          path: 'howmanywomen'
        },
        {
          title: 'Which countries exported most female authorships to Norway?',
          path: 'whichcountriesexported'
        },
        {
          title: 'How many translations are there into Norwegian, and from which countries?',
          path: 'howmanytranslations'
        },
        {
          title: 'Show the 10 or 20 most translated authors into Norwegian',
          path: 'showthe10or20'
        },
        {
          title: 'Give a timeline for the import of foreign literature in 19th century Norway',
          path: 'timelineofimport'
        },
        {
          title: 'Compare the Norwegian literary scene of selected decades: e.g. 1850s, 1890s, 1910s',
          path: 'comparenorwegianliterary'
        },
        {
          title: 'Were Norwegian women authors read abroad?',
          path: 'werereadabroad'
        },
        {
          title: 'Investigate and compare the European reception of some selected Anglophone authors. Where in the world was for instance Jane Austen most read before 1930? Or George Eliot, Charlotte Bronte, Mary Wollstonecraft, Harriet Beecher Stowe, M. L. Alcott, and others.',
          path: 'investigateeuropeanreception'
        }
      ]
    }
  },
  computed: {
    searchOpen: {
      get () {
        this.searchOpenValue = this.predefinedQuestionSearchInput.length > 0 && this.searchOpenForce
        return this.searchOpenValue
      },
      set (val) {
        this.searchOpenValue = val
      }
    },
    filteredList() {
      return this.questions.filter(question => {
        return question.title.toLowerCase().includes(this.predefinedQuestionSearchInput.toLowerCase())
      })
    }
  }
}
</script>

<style lang="less">
  .el-popover {
    max-width: 700px;
  }
  .search-header {
    padding: 10px;
    padding-left: 20px;
    width: 570px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: darken(white, 1%);
    border-bottom: 1px solid darken(white, 8%);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .search-icon {
      height: 30px;
    }
    .search-title {
      max-width: 100%;
      padding: 0;
      padding-left: 10px;
      padding-top: 10px;
      font-family: HypatiaSansPro, sans-serif;
      color: darken(#00bfa5, 20%);
      margin: 0;
    }
  }
  .no-results {
    padding: 20px;
    font-family: HypatiaSansPro, sans-serif;
  }
  .questions-list-search {
    list-style: none;
    padding: 20px;
    margin: 0;
    position: relative;

    :not(:last-child) {
      margin-bottom: 10px;
    }

    .question-link {
      max-width: 100%;
      display: flex;
      .results {
        width: 100%;
      }
      .link-title {
        color: #009688;
        margin-left: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
        font-family: HypatiaSansPro, sans-serif;
        cursor: pointer;
      }
    }
  }
</style>
