<template>
  <div class="page-questions-list">
    <div class="questions-heading">
      <img src="../../assets/asking.svg" alt="question image" class="question-image">
      <h2>Here are all the available question visualization titles:</h2>
    </div>
    <ul class="questions-list">
      <router-link :to="'/visualization/' + question.path" tag="li" class="question-link-wrapper animated fadeIn" v-for="(question, idx) in questions" :key="idx">
        <div class="question-link">
          <i class="el-icon-question"></i>
          <div class="link-title">
            {{ question.title }}
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          title: 'Timeline for the import of foreign literature in 19th century Norway',
          path: 'timelineofimport'
        },
        {
          title: 'Comparison of the Norwegian literary scene of selected decades (1850s, 1890s, 1910s)',
          path: 'comparenorwegianliteraryscene'
        },
        {
          title: 'Were Norwegian women authors read abroad?',
          path: 'werereadabroad'
        },
        {
          title: 'Investigation and comparison of the European reception of selected Anglophone authors.',
          path: 'investigateeuropeanreception'
        }
      ]
    }
  }
}
</script>

<style lang="less">
.page-questions-list {

  .questions-heading {
    display: flex;
    align-items: center;
    padding: 10px;
    .question-image {
      margin-right: 20px;
      height: 100px;
    }
    h2 {
      font-size: 36px;
    }
  }

  .questions-list {
    list-style: none;
    padding-left: 0;
    .question-link-wrapper {
      margin-top: 20px;
      border-radius: 5px;
      transform: scale(1);
      transition: all .15s linear;
      background-color: #f3f6f9;
  
      &:hover {
        background-color: white;
        border-color: rgba(3,27,77,0.1);
        box-shadow: 0 2px 4px rgba(3,27,77,0.05);
        position: relative;
        transform: scale(1.05);
        z-index: 10;
      }
  
      a {
        text-decoration: none;
        display: flex;
      }
  
      .question-link {
        display: flex;
        align-items: center;
        padding: 15px 30px;
        cursor: pointer;
  
        i {
          margin-right: 30px;
          font-size: 40px;
          color: #00bfa5;
        }
  
        .link-title {
          font-weight: bold;
          font-size: 16px;
          color: #031b4f;
          margin: 0;
        }
  
        .link-description {
          font-weight: normal;
          margin: 0;
          font-size: 16px;
          color: rgba(3,27,77,0.7);
        }
      }
    }
  }
}
</style>
