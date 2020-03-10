<template>
  <div class="white">
    <NavBar />
    <div v-if="!this.authorized" class="not_authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized" class="chart-area">
      <div style="width:100%">
        <img v-bind:src="appDir.members + this.user.image" class="member" />
      </div>
       <form @submit.prevent="saveForm">
        Select:
        <v-select
          multiple
          :reduce="display => display.code"
          :options="this.scope_options"
          label="display"
          v-model="scope"
        ></v-select>
        </form>

      <div>
        <h1 class="center">{{ this.item_details.name }}</h1>
      </div>
      <div id="traffic-chart" class="traffic-chart"></div>

      <div class="center">
        <table class="progress_table">
          <tr>
            <td class="row_label">Goal</td>
            <td class="row_value">{{ this.res.goal }}</td>
          </tr>
        </table>

        <div v-if="item_details.cumulative == 'Y'">
          <table class="progress_table">
            <tr>
              <td class="row_label">Total for year</td>
              <td class="row_value">{{ this.res.this_year_total }}</td>
            </tr>
          </table>
        </div>
        <div v-if="item_details.cumulative != 'Y'">
          <table class="progress_table">
            <tr>
              <td class="row_label">Average for year</td>
              <td class="row_value">{{ this.res.this_year_total }}</td>
            </tr>
          </table>
        </div>
        <div class="center">
          Key:
          <span class="last_year">{{ this.res.last_year }}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span
            class="this_year"
          >{{ this.res.this_year }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/MyNavBar.vue'
import Chartist from 'chartist'
import vSelect from 'vue-select'
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
import '@/assets/css/chartist.css'
export default {
  components: {
    NavBar,
    Chartist,
     'v-select': vSelect
  },

  props: ['uid', 'tid', 'year', 'item'],
  computed: mapState(['user', 'appDir', 'months']),
  mixins: [authorMixin],
  data() {
    return {
      item_details: {},
      series: [],
      res: [],
      canvasId: 'traffic-chart'
    }
  },
  methods: {
    // see https://www.w3schools.com/howto/howto_js_collapsible.asp
    showDefinition(item) {
      console.log('hit button')
      var content = document.getElementById(item.id)
      if (content.style.display === 'block') {
        content.style.display = 'none'
      } else {
        content.style.display = 'block'
      }
    },

    async loadForm() {
      this.authorized = this.authorize(
        'personal',
        this.$route.params.uid,
        this.$route.params.tid
      )
      if (this.authorized) {
        try {
          var params = []
          params.route = JSON.stringify(this.$route.params)
          this.scope = await AuthorService.getItemsPerson(params)

          this.res = await AuthorService.getProgressPersonForYear(params)
          var temp = JSON.parse(this.res.item)
          this.item_details = temp[0]
          console.log('this.res')
          console.log(this.res)
          console.log(this.item_details)

          this.series = this.res.progress
          var chart = new Chartist.Line(
            '#traffic-chart',
            {
              labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
              ],
              series: this.series
            },
            {
              low: 0,
              onlyInteger: true,
              showArea: false,
              showLine: true,
              showPoint: true,
              fullWidth: true,
              axisX: {
                showGrid: true,
                onlyInteger: true
              },
              axisY: {
                onlyInteger: true
              }
            }
          )
          chart.on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              })
            }
          })
        } catch (error) {
          console.log('There was an error in myMonth.vue:', error) // Logs out the error
        }
      }
    }
  },
  mounted() {
    //}
  },
  beforeCreate: function() {
    document.body.className = 'user'
  },
  async created() {
    this.loadForm()
  }
}
</script>
<style scoped>
div.chart-area {
  background-color: white;
}
div.traffic-chart {
  height: 300px;
}
.last_year {
  color: #d70206;
}
.this_year {
  color: #1edb1e;
  color: #21641c;
}

table.progress_table {
  width: 60%;
  margin: auto;
  text-align: center;
  background-color: #21641c;
}
td {
  border-bottom: 1px solid #ddd;
}
td.row_label {
  width: 80%;
  text-align: left;
  color: white;
}
td.row_value {
  width: 20%;
  text-align: right;
  color: white;
}

.definition {
  color: red;
  font-size: 14px;
}
</style>
