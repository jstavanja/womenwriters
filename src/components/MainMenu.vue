<template>
  <el-popover
    placement="right-start"
    width="400"
    trigger="click"
    class="main-menu">
    <el-button class="btn-menu-open" v-on-clickaway="closeMenu" @click='openMenu' :class="{'is-open': menuOpen}" type="info" icon="el-icon-caret-right" round slot="reference">Menu</el-button>
    <ul class="navigation-links">
      <li>
        <div class="navigation-link">
          <i class="el-icon-question"></i>
          <div class="link-text">
            <p class="link-title">I wonder ...</p>
            <p class="link-description">Questions list</p>
          </div>
        </div>
      </li>
      <li>
        <div class="navigation-link">
          <i class="el-icon-info"></i>
          <div class="link-text">
            <p class="link-title">Who?</p>
            <p class="link-description">About the authors</p>
          </div>
        </div>
      </li>
      <li>
        <div class="navigation-link">
          <i class="el-icon-share"></i>
          <div class="link-text">
            <p class="link-title">Original stuff</p>
            <p class="link-description">Original data website</p>
          </div>
        </div>
      </li>
    </ul>
  </el-popover>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  data() {
    return {
      menuOpen: false,
      menuOpenedTimes: 0
    }
  },
  methods: {
    openMenu() {
      if (this.menuOpen) {
        this.closeMenu()
        return
      }
      this.menuOpen = true
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>

<style lang="less">
  .el-popover {
    padding: 0;
    background-color: #f3f6f9;

  }
  .el-popover[x-placement^=right] .popper__arrow::after {
    border-right-color: #f3f6f9;
  }
  .btn-menu-open.is-round {
    padding: 20px;
    box-shadow: 2px 4px 8px rgba(255,255,255,0.5);
    color: black;
    background-color: white;
    border-color: rgba(3,27,77,0.1);
    transform: scale(1);
    transition: all .15s linear;
    &:hover {
      transform: scale(1.05);
    }
    &.is-open {
      i {
        transform: rotate(180deg);
      }
    }
    i {
      transition: all .25s ease-in-out;
      font-weight: 900;
    }
  }
  .navigation-links {
    font-family: HypatiaSansPro;
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    li {
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

      .navigation-link {
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
</style>
