<template>
  <el-popover
    placement="right-start"
    width="400"
    trigger="click"
    v-model="menuOpen"
    class="main-menu">
    <el-button class="btn-menu-open" v-on-clickaway="closeMenu" @click='openMenu' :class="{'is-open': menuOpen}" type="info" icon="el-icon-caret-right" round slot="reference">Menu</el-button>
    <ul class="navigation-links">
      <li @click="closeMenu">
        <router-link to="/" class="navigation-link" tag="div">
          <i class="el-icon-location"></i>
          <div class="link-text">
            <p class="link-title">Home</p>
            <p class="link-description">Homepage is where your heart is</p>
          </div>
        </router-link>
      </li>
      <li @click="closeMenu">
        <router-link to="/questions" class="navigation-link" tag="div">
          <i class="el-icon-question"></i>
          <div class="link-text">
            <p class="link-title">Questions list</p>
            <p class="link-description">I wonder ...</p>
          </div>
        </router-link>
      </li>
      <li @click="closeMenu">
        <router-link to="/authors" class="navigation-link" tag="div">
          <i class="el-icon-info"></i>
          <div class="link-text">
            <p class="link-title">About the authors</p>
            <p class="link-description">Who?</p>
          </div>
        </router-link>
      </li>
      <li @click="closeMenu">
        <a href="http://resources.huygens.knaw.nl/womenwriters">
          <div class="navigation-link">
              <i class="el-icon-share"></i>
              <div class="link-text">
                <p class="link-title">Original data website</p>
                <p class="link-description">The source</p>
              </div>
          </div>
        </a>
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

      a {
        text-decoration: none;
        display: flex;
      }

      .navigation-link {
        display: flex;
        align-items: center;
        padding: 15px 30px;
        cursor: pointer;

        &.router-link-exact-active {
          background-color: #fafafa;
          border-radius: 5px;
          border: 1px solid rgba(3,27,77,0.1);
          i {
            margin-right: 30px;
            color: #009688;
          }
          .link-title {
            font-weight: bolder;
            text-decoration: underline;
            text-decoration-color: #031b4f;
          }
        }

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
</style>
