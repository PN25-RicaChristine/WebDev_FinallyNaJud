<template>
  <div>
    <v-row>
      <v-col
        cols="auto"
        lg="3"
      >
        <v-list>
          <!-- sidebar -->
          <v-list-item>
            <v-img
              id="image"
              src="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png"
              height="200"
              max-width="200"
            ></v-img>
          </v-list-item>
          <v-list-item
            link
            two-line
            class="title"
          >
            <v-list-item-content>
              <v-list-item-title>{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{type}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item
            link
            @click="redirect(item.href)"
          >
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
        <!-- Tinuod nga post ni diria -->
        <div class="uploaded_post">
          <div>
            <br>
            <br>
            <Post @upload_post="upload_post" />
          </div>
        </div>

        <!-- Posts -->
        <!-- <div v-for="(item, index) in this.createPost" :key="index"> -->
        <Uploaded_Post :posts="this.posts" />

        <!-- Comment Dialog here!! -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card class="px-2">
            <br>
            <v-text-field
              outlined
              label="Comment here..."
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="secondary"
                @click="dialog = false"
              >Comment</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
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
#postbtn {
  float: right;
  top: -20px;
}
#fileinput {
  margin-left: 2%;
}
</style>

<script>
import Post from "components/Post.vue";
import Uploaded_Post from "components/Uploaded_Posts.vue";

export default {
  // name: "UploadPost",
  components: {
    Uploaded_Post,
    Post
  },
  data() {
    return {
      name:"Full Name",
      type: "User",
      dialog: false,
      post: {
        files: [],
        rating: 0
      },
      items: [
        { href: "/dashboard", title: "Home", icon: "dashboard" },
        { href: "/myaccount", title: "My Account", icon: "account_circle" },
        { href: "/login", title: "Logout", icon: "logout" }
      ],
      posts: [
        {
          id: 1,
          files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0
        },
        {
          id: 2,
          files: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0
        }
      ]
    };
  },
  methods: {
    redirect(pathname) {
      this.$router.push({ path: pathname });
    },
    changeColor() {
      this.changeColor = "deep-orange";
    },
    upload_post(object) {
      this.$on("upload_post", object)
      this.posts.push(object);
      console.log("yo")
    }
  }
};
</script>

