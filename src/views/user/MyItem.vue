<template>
  <div>
    <NavBar />
    <div v-if="!this.authorized">
      <p>
        You have stumbled into a restricted page. Sorry I can not show it to you
        now.
      </p>
    </div>
    <div v-if="this.authorized" class="white">
      <h2>Enter a Personal Item</h2>
      <p>
        Is there something that YOU want to keep track of? Something you want to
        celebrate? Here is where you can customize Celebrate to meet your needs.
      </p>
      <form @submit.prevent="saveForm">
        <BaseInput
          v-model="$v.item.name.$model"
          label="Item"
          type="text"
          class="field"
          :class="{ error: $v.item.name.$error }"
          @blur="$v.item.name.$touch()"
        />
        <BaseTextarea
          v-model="$v.item.paraphrase.$model"
          label="Description"
          type="text"
          class="field"
          :class="{ error: $v.item.paraphrase.$error }"
          @blur="$v.item.paraphrase.$touch()"
        />
        <BaseInput
          v-model="$v.item.details.$model"
          label="Any details you want to track?"
          type="text"
          class="field"
        />
        <BaseSelect
          label="Record Number?"
          :options="yes_or_no"
          v-model="$v.item.numbers.$model"
          class="field"
        />
        <div v-if="$v.item.numbers.$model == 'Y'">
          <BaseSelect
            label="Cumulative"
            :options="yes_or_no"
            v-model="$v.item.cumulative.$model"
            class="field"
          />
        </div>
      </form>
      <button class="button green" @click="saveForm">Update</button>
      <button class="button red" @click="deleteForm">Delete</button>
    </div>
  </div>
</template>
<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarHamburger.vue'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  computed: mapState(['user']),
  props: ['uid', 'tid', 'id'],
  components: {
    NavBar
  },
  mixins: [authorMixin],
  data() {
    return {
      yes_or_no: ['Y', 'N'],
      item: {
        id: null,
        celebration_set: 'personal',
        tid: null,
        uid: null,
        sequence: null,
        page: null,
        code: null,
        name: null,
        definition: null,
        paraphrase: null,
        details: null,
        numbers: 'Y',
        cumulative: 'Y'
      }
    }
  },
  validations: {
    item: {
      id: {},
      celebration_set: {},
      tid: {},
      uid: {},
      sequence: {},
      page: {},
      code: {},
      name: { required },
      definition: {},
      paraphrase: { required },
      details: {},
      numbers: { required },
      cumulative: { required }
    }
  },
  methods: {
    async saveForm() {
      var params = {}
      this.item.uid = this.$route.params.uid
      params.item = JSON.stringify(this.item)
      console.log(params)
      var res = await AuthorService.updateItem(params)
      //console.log(res)
      this.return()
    },
    async deleteForm() {
      var params = {}
      params.uid = this.uid
      params.item = JSON.stringify(this.item)
      console.log(params)
      var res = await AuthorService.deleteItem(params)
      console.log(res)
      this.return()
    },
    return() {
      console.log('check')
    },
    returnX() {
      this.$router.push({
        name: 'myGoals',
        params: {
          uid: this.$route.params.uid,
          tid: this.$route.params.tid
        }
      })
    }
  },

  async created() {
    //this.authorized = this.authorize('write', this.uid)
    this.authorized = true
    if (this.authorized) {
      try {
        var params = {}
        params['uid'] = this.uid
        params['tid'] = this.user.team
        if (typeof this.$route.params.id != 'undefined') {
          console.log('I am going to get item' + this.$route.params.id)
          params['id'] = this.$route.params.id
          var res = await AuthorService.getItem(params)
          console.log(res)
          if (typeof res != 'undefined') {
            this.item = res
          }
        }
      } catch (error) {
        console.log('There was an error in Myitem.vue:', error) // Logs out the error
      }
    }
  }
}
</script>
<style scoped>
.white {
  background-color: white;
}
</style>
