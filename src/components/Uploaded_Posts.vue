<template>
  <div>
    <v-card max-width="800" v-for="(post,x) in posts" :key="x" class="mx-auto" id="post">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{post.post_blogger}}</v-list-item-title>
          <v-list-item-subtitle>{{post.date_time}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>{{post.post_text}}</v-card-text>

      <div class="post-container">
        <v-img :src="`http://localhost:3000/files/${post.post_image}`"></v-img>
        
         <!-- <img src="@/../api/uploads/d.png" alt="" style='height="300"'> -->
      </div>

      <!-- Like actions -->

      <v-card-actions>
        <v-chip-group multiple active-class="primary--text">
          <v-chip v-for="tag in tags" :key="tag">
            <v-icon v-for="tag in tags" :key="tag">{{ tag }}</v-icon>
            <label for="">{{count}}</label>
          </v-chip>

          <v-chip flat v-show="$route.path === '/dashboard'? true : false">
            <v-btn text icon>
              <v-icon @click="dialog = !dialog">mdi-comment</v-icon>
            </v-btn>
          </v-chip>
        </v-chip-group>

        <!-- Comment actions -->
        <v-spacer></v-spacer>
        <!-- Ratings -->
        <div class="text-center" v-show="$route.path === '/dashboard'? true : false">
          <v-rating v-model="post.rating" background-color="yellow" color="yellow" x-large></v-rating>
        </div>
        <!-- Comment Dialog -->
      </v-card-actions>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="px-2">
          <br />
          <v-text-field v-model="comment" outlined label="Comment here..."></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="dialog = false">Comment</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<style scoped>
#post {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>

<script>
export default {
  props: ["posts"],

  data() {
    return {
      count :0,
      comment: "",
      // files: [],
      dialog: false,
      tags: ["mdi-thumb-up"]
    };
  },

  methods: {},

  
};
</script>
