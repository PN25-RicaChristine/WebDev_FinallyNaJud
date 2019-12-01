<template>
  <div>
    <v-row>
      <v-col cols="auto" lg="3">
        <v-list>
          <!-- sidebar -->
          <v-list-item style="text-align:center">
            <v-img
              id="image"
              src="https://randomuser.me/api/portraits/women/85.jpg"
              height="200"
              max-width="200"
            ></v-img>
          </v-list-item>
          <v-list-item link two-line class="title">
            <v-list-item-content>
              <v-list-item-title>Blogger Name</v-list-item-title>
              <v-list-item-subtitle>
                Blogger
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-for="item in items" :key="item.title">
          <v-list-item link @click="redirect(item.href)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-card class="mx-auto" max-width="800">
          <div>
            <!-- Create Post -->
            <v-card-title id="title">Create Vlog</v-card-title>
          </div>
          <div>
            <div id="text">
              <v-textarea v-model="description" outlined name="input-7-4" label="Description..."></v-textarea>
            </div>
            <v-card-actions>
              <v-file-input
                v-model="post.files"
                color="deep-purple accent-4"
                counter
                placeholder="Add Photo"
                prepend-icon="mdi-camera"
                :show-size="1000"
                accept="image/*"
                id="fileinput"
                v-on:change="handleFileUpload"
                ref="myFiles"
              ></v-file-input>

              <v-spacer></v-spacer>

              <!-- Post Button -->
              <v-btn color="info" id="postbutton" @click="upload_post">Post</v-btn>
            </v-card-actions>
          </div>
        </v-card>

        <!-- Posts -->
        <!-- <div v-for="(item, index) in this.createPost" :key="index"> -->
        <v-card max-width="800" v-for="(post,x) in posts" :key="x" class="mx-auto" id="post">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Jessavel Toring</v-list-item-title>
              <v-list-item-subtitle v-model="time">time here</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-card-text>{{post.description}}</v-card-text> -->

          <v-card-text>{{description}}</v-card-text>

          <v-img :src="post.files" height="194"></v-img>
          <!-- Posts Actions -->
          <v-card-actions>
            <v-btn icon>
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-comment</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="text-center">
              <v-rating v-model="post.rating" background-color="yellow" color="yellow" x-large></v-rating>
            </div>
          </v-card-actions>
        </v-card>
        <!-- </div> -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      description: "",
      post: {
        files: [],
        rating: 0
      },
      items: [
        { href: "/dashboard", title: "Home", icon: "dashboard" },
        { href: "/login", title: "My Account", icon: "account_circle" },
        { href: "/login", title: "Logout", icon: "logout" }
      ]
      // posts: [
      //   {
      //     id: 1,
      //     files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
      //     description:
      //       "Visit ten places on our planet that are undergoing the biggest changes today.",
      //     rating: 0
      //   },
      //   {
      //     id: 2,
      //     files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
      //     description:
      //       "Visit ten places on our planet that are undergoing the biggest changes today.",
      //     rating: 0
      //   }
      // ]
    };
  },
  methods: {
    handleFileUpload() {
      try {
        this.post.files[0] = this.$refs.myFiles.files;
      } catch (error) {
        console.log(error);
      }
    },
    upload_post() {
      var upload = new FormData();
      upload.append("files", this.post.files);
      console.log(upload);
      // this.post.id = this.posts.length;
      // this.posts.push(this.post);
      // axios
      //   .post(url, upload)
      //   .then(response => {})
      //   .catch(err => {});
    },
    redirect(pathname) {
      this.$router.push({ path: pathname });
    }
    // createPost(){
    //    var object = {

    //    }
  }
};
</script>
<style scoped>
#image {
  float: center;
  width: 20px;
}

#sidebar {
  padding-top: 0px;
}
#search {
  width: 50px;
}
#desbody {
  width: 3%;
  margin-top: 20%;
}
#title {
  background-color: lightgray;
}
#drawer {
  background-color: lightgray;
}
#input {
  width: 95%;
  height: 50%;
  margin-left: 2%;
}
#post {
  margin-top: 4%;
}
#text {
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 2%;
}
#postbutton {
  margin-right: 2%;
}
#fileinput {
  margin-left: 2%;
}
</style>
