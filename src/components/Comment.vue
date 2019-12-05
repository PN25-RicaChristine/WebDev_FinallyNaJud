<template>
  <!-- Comment Dialog -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="px-2">
      <br />
      <v-text-field v-model="comment" outlined label="Comment here..."></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="commentni">Comment</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    comment: String
  },
  data() {
    return {
      id: 0
    };
  },

  methods: {
    commentni() {
      var object = { id: this.id++ , "comment": this.comment};
      this.$emit("commentto", object);
      console.log(object);
    }
  }
};
</script>