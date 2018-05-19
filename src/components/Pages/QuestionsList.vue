<template>
  <div class="page-questions-list">
    <div class="questions-heading">
      <img src="../../assets/asking.svg" alt="question image" class="question-image">
      <h2>Here are all the available question visualization titles:</h2>
    </div>
    <ul class="questions-list">
      <router-link to="/howmanywomen" tag="li" class="question-link-wrapper">
        <div class="question-link">
          <i class="el-icon-question"></i>
          <div class="link-title">
            How many women writers were read in Norway before 1930?
          </div>
        </div>
      </router-link>
      <li class="question-link-wrapper">
        <div class="question-link">
          <i class="el-icon-question"></i>
          <div class="link-title">
            Question 2
          </div>
        </div>
      </li>
      <li class="question-link-wrapper">
        <div class="question-link">
          <i class="el-icon-question"></i>
          <div class="link-title">
            Question 3
          </div>
        </div>
      </li>
      <li class="question-link-wrapper">
        <div class="question-link">
          <i class="el-icon-question"></i>
          <div class="link-title">
            Question 4
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

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
          color: #f785ed;
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
