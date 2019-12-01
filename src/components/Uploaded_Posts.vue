<template>
  <div>
    <v-card
      max-width="800"
      v-for="(post,x) in posts"
      :key="x"
      class="mx-auto"
      id="post"
    >
      <br>
      <br>
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Jessavel Toring</v-list-item-title>
          <v-list-item-subtitle v-model="time">time here</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>{{post.description}}</v-card-text>

      <v-img
        :src="post.files"
        height="194"
      ></v-img>

      <!-- Like actions -->
      <v-card-actions>
        <v-btn
          text
          icon
          @click="type='host'"
        >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>

        <!-- Comment actions -->
        <v-btn icon>
          <v-icon
            @click="dialog = !dialog"
            color="warning"
          >mdi-comment</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- Ratings -->
        <div class="text-center">
          <v-rating
            v-model="post.rating"
            background-color="yellow"
            color="yellow"
            x-large
          ></v-rating>
        </div>
        <!-- Comment Dialog -->
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
export default {
  props: ["posts"]
};
</script>
