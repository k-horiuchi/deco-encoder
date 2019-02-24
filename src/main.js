// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    description: ''
  },
  computed: {
    replace () {
      var text = this.description
      text = text.split(' ').join('').split('\n').join('').split('\r').join('')
      text = text.replace('(', '').replace(/(.*)\)/, '$1\r END ').replace(/decode/i, 'CASE ')
      var ary = text.split('')
      var arySize = ary.length
      var result = ''
      var conCount = 0
      var v = ''
      var cnmNum = text.split(',').length
      for (var i = 0; i < arySize; i++) {
        v = ary[i]
        // もし関数の左カッコだった場合
        if (v === '(') {
          result += v
          // 右カッコが来るまでループ
          while (ary[i] !== ')') {
            i++
            // 右カッコがない場合は無限ループを防止させる
            if (i > arySize) {
              ary[i] = ')'
            }
            result += ary[i]
          }
          if (ary[i] === ')') {
            ary[i] = ary[i] + ' '
          }
        } else if (v === ',') {
          conCount++
          if (conCount === 1) {
            result += '\r\n WHEN '
          } else if (conCount % 2 === 0) {
            result += ' THEN '
          } else if (conCount % 2 !== 0) {
            if (conCount === cnmNum - 1) {
              result += '\r\n ELSE '
            } else {
              result += '\r\n WHEN '
            }
          } else {
            result += v
          }
        } else {
          result += v
        }
      }
      return result.split('undefined)').join('')
    },
    len () {
      return this.description.length
    }
  }
})
