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
              <v-list-item-subtitle>Blogger</v-list-item-subtitle>
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
        <!-- Create Post -->

        <div class="uploaded_post">
          <div>
            <br />
            <br />
            <Post @upload_post="upload_post" />
          </div>
        </div>
        <!-- Posts -->
        <Uploaded_Post :posts="this.posts" />
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
#postbutton {
  margin-right: 2%;
}
#fileinput {
  margin-left: 2%;
}
</style>


<script>
 import Post from "components/Post.vue";
import Uploaded_Post from "components/Uploaded_Posts.vue";
export default {
  components: {
    Uploaded_Post,
    Post
  },
  data() {
    return {
      description: "",
      post: {
        files: [],
        rating: 0
      },
      items: [
        { href: "/bloggerdashboard", title: "Home", icon: "dashboard" },
        { href: "/myaccount", title: "My Account", icon: "account_circle" },
        { href: "/login", title: "Logout", icon: "logout" }
      ],
      posts: [
        {
          id: 1,
          files: "https://www.cebutours.ph/wp-content/uploads/2017/03/osmena-peak.png",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0,
          category: ''
        },
        {
          id: 2,
          files: "https://www.travelingcebu.com/images/north-sky-beach-resort.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0,
          category: ''
        }
      ]
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
    upload_post(object) {
      var upload = new FormData();
      upload.append("files", this.post.files);
      console.log(upload);
      this.$on("upload_post", object);
      this.posts.push(object);
      console.log("yo");
    
    },
    redirect(pathname) {
      this.$router.push({ path: pathname });
    }
  }
};
</script>
