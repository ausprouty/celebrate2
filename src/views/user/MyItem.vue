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
          v-model="name"
          label="Item"
          type="text"
          class="field"
          :class="{ error: $v.name.$error }"
          @blur="$v.name.$touch()"
        />
        <BaseTextarea
          v-model="paraphrase"
          label="Description"
          type="text"
          class="field"
          :class="{ error: $v.paraphrase.$error }"
          @blur="$v.paraphrase.$touch()"
        />
        <BaseInput
          v-model="details"
          label="Any details you want to track?"
          type="text"
          class="field"
        />
        <BaseSelect label="Record Number?" :options="yes_or_no" v-model="numbers" class="field" />
        <div v-if="numbers == 'Y'">
          <BaseSelect label="Cumulative" :options="yes_or_no" v-model="cumulative" class="field" />
        </div>
        <button class="button green" @click="saveForm">Update</button>
      </form>
    </div>
  </div>
</template>
<script>
import AuthorService from '@/services/AuthorService.js'
import NavBar from '@/components/NavBarAdmin.vue'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { authorMixin } from '@/mixins/AuthorMixin.js'
export default {
  computed: mapState(['user']),
  props: ['uid', 'id'],
  components: {
    NavBar
  },
  mixins: [authorMixin],
  data() {
    return {
      res: null,
      yes_or_no: ['Y', 'N'],
      celebration_set: null,
      tid: null,
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
  },
  validations: {
    id: {},
    celebration_set: {},
    tid: {},

    sequence: {},
    page: {},
    code: {},
    name: { required },
    definition: {},
    paraphrase: { required },
    details: {},
    numbers: { required },
    cumulative: { required }
  },
  methods: {
    async saveForm() {
      var params = {}
      if (typeof this.id != 'undefined') {
        params.id = this.id
      }
      params.name = this.name
      params.celebration_set = 'personal'
      params.uid = this.uid
      params.paraphrase = this.paraphrase
      if (typeof this.details != 'undefined') {
        params.details = this.details
      }
      params.numbers = this.numbers
      params.cumulative = this.cumulative
      console.log(params)
      await AuthorService.updateItem(params)
      this.$router.push({
        name: 'myGoals',
        params: {
          uid: this.$route.params.uid
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
