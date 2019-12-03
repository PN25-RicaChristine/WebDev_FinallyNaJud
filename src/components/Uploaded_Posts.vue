<template>
  <div>
    <v-card max-width="800" v-for="(post,x) in posts" :key="x" class="mx-auto" id="post">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Jessavel Toring</v-list-item-title>
          <v-list-item-subtitle v-model="time">time here</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>{{post.description}}</v-card-text>

      <v-img :src="post.files" height="194"></v-img>

      <!-- Like actions -->
      <v-card-actions>
        <v-chip-group multiple column>
          <v-chip outline>
            <v-btn text icon @click="type='host'">
              <v-icon color="blue">mdi-thumb-up</v-icon>
            </v-btn>
          </v-chip>

          <v-chip outline>
            <v-btn text icon @click="type='host'">
              <v-icon @click="dialog = !dialog">mdi-comment</v-icon>
            </v-btn>
          </v-chip>
        </v-chip-group>

        <!-- Comment actions -->
        <!-- <v-btn icon>
          <v-icon @click="dialog = !dialog" color="warning">mdi-comment</v-icon>
        </v-btn>-->
        <v-spacer></v-spacer>
        <!-- Ratings -->
        <div class="text-center">
          <v-rating v-model="post.rating" background-color="yellow" color="yellow" x-large></v-rating>
        </div>
        <!-- Comment Dialog -->
      </v-card-actions>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card class="px-2">
          <br />
          <v-text-field outlined label="Comment here..."></v-text-field>
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
      dialog: false
    };
  }
};
</script>
