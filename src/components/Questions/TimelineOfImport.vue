<template>
  <div class="question-timeline-of-import">
    <el-row class="page-header animated fadeIn">
      <h2 class="visualization-title">Timeline for the import of foreign literature in 19th century Norway</h2>
      <el-select v-model="decadeFilter" clearable placeholder="Choose a decade filter">
        <el-option
          v-for="decade in decades"
          :key="decade"
          :label="decade"
          :value="decade">
        </el-option>
      </el-select>
    </el-row>
    <div class="visualization">
      <div class="year-row" v-for="year in years" :key="year[0]">
        <div class="year-number">{{ year[0] }}</div>
        <div class="year-books">
          <div class="book" v-for="(book, idx) in year[1]" :key="idx">
            <img src="../../assets/open-book.svg" alt="open book image" class="book-icon">
            <div class="book-info">
              <p class="title">{{ book.name }}</p>
              <p class="authors">
                <span class="author" v-for="(author, idx) in book.creators" :key="idx">{{ author }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timelineData from '../../datasets/static_tl.json';
export default {
  data () {
    return {
      decades: [],
      decadeFilter: ""
    }
  },
  computed: {
    years () {
      // filter by decade unless there is no filter
      if (this.decadeFilter === "") {
        return Object.entries(timelineData)
      }
      let arrayOfYears = Object.keys(timelineData)
      let filteredYears = arrayOfYears.filter((year) => {
        return year - this.decadeFilter >= 0 && year - this.decadeFilter < 10
      })
      return Object.entries(timelineData).filter(year => {
        return filteredYears.indexOf(year[0]) >= 0
      })
    }
  },
  created () {
    for (let i = 10; i <= 90; i += 10) {
      this.decades.push(1800+i)
    }
    this.decades.push(1900)
  }
}
</script>

<style lang="less">
  .question-timeline-of-import {
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &::after, &::before {
        display: none;
      }
    }
    .year-row {
      border-top: 1px solid darken(white, 15%);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px;

      &:nth-child(2n) {
        background: darken(white, 4%);
      }

      .year-number {
        margin-right: 20px;
        font-weight: bold;
        color: red;
        font-size: 30px;
      }
      .year-books {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        .book {
          cursor: context-menu;
          margin: 5px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #00bfa5;
          flex-basis: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: scale(1);
          &:hover {
            transform: scale(1.05);
            transition: all .2s ease-in-out;
          }
          .book-icon {
            height: 35px;
          }
          .book-info {
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .title {
              text-align: center;
              font-weight: bold;
              font-size: 15px;
              margin: 0;
            }
            .authors {
              margin: 0;
              text-align: center;
              .author {
                font-size: 12px;
                color: lighten(black, 20%);
              }
            }
          }
        }
      }
    }
  }
</style>
