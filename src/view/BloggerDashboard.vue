<template>
  <div>
    <v-row>
      <v-col cols="auto" lg="3">
        <v-list>
          <!-- sidebar -->
          <v-list-item style="text-align:center">
            <v-img
              id="image"
              src="http://files.softicons.com/download/internet-icons/web-2.0-user-icons-by-icontexto/png/256/icontexto-user-web20-blogger.png"
              height="200"
              max-width="200"
            ></v-img>
          </v-list-item>
          <v-list-item link two-line class="title">
            <v-list-item-content>
              <v-list-item-title>{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{type}}</v-list-item-subtitle>
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
        <v-btn @click="logout">Logout</v-btn>
      </v-col>
      <v-col cols="8">
        <!-- Create Post -->

        <div class="uploaded_post">
          <div>
            <br />
            <br />
            <Post v-on:uploaded="updatePosts" />
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
import axios from "axios";

export default {
  components: {
    Uploaded_Post,
    Post
  },
  props: {
    category: String,
  },
  data() {
    return {
      files: [],
      name: "",
      // myImage: "",
      type: "",
      description: "",
      items: [
        { href: "/bloggerdashboard", title: "Home", icon: "dashboard" },
        { href: "/myaccount", title: "My Account", icon: "account_circle" }
      ],
      posts: [
        {
          id: 1,
          files:
            "https://www.travelingcebu.com/images/north-sky-beach-resort.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0,
          category: ""
        },
        {
          id: 2,
          files:
            "https://www.travelingcebu.com/images/north-sky-beach-resort.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0,
          category: ""
        },
        {
          id: 3,
          files:
            "https://www.travelingcebu.com/images/north-sky-beach-resort.jpg",
          description:
            "Visit ten places on our planet that are undergoing the biggest changes today.",
          rating: 0,
          category: ""
        }
      ]
    };
  },
  watch: {
    category(val) {

      this.retrieveCat(val);
    }
  },
  methods: {
    retrieveCat(cat) {
      
      axios.get("http://localhost:3000/bloggers/getCategory/"+cat)
      .then(res => {
        this.posts = res.data.response;
      }).catch(err => {
   
        console.log(err);
      })
    },
    handleFileUpload() {
      try {
        this.files[0] = this.$refs.myFiles.files;
      } catch (error) {
        console.log(error);
      }
    },
    upload_post(object) {
      var upload = new FormData();
      upload.append("files", this.files);
      console.log(upload);
      this.$on("upload_post", object);
      this.posts.push(object);
      console.log("nigana ni sya!");
    },
    redirect(pathname) {
      this.$router.push({ path: pathname });
    },
    updatePosts(post) {
      console.log(post);
      this.posts.push(post);
      this.sortPosts();
    },
    sortPosts() {
      this.posts.sort((a, b) => (a.date_time < b.date_time ? 1 : -1));
    },
    logout: function() {
      sessionStorage.clear();
      localStorage.clear();
      localStorage.removeItem("jwt");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/login");
    }
  },
  mounted() {
    axios.get("http://localhost:3000/bloggers/getPost").then(res => {
      // console.log(res)
      this.posts = res.data.response;
      this.sortPosts();
      console.log(res.data.response.post_image);

      this.$store
        .dispatch("authorizedAsync", localStorage.getItem("jwt"))
        .then(response => {
          console.log(response);
          this.name = response.data.name;
          this.type = response.data.type;
          //this.myImage = response.data.profile_pic;
          console.log(response.data.profile_pic);
        })
        .catch(err => {
          console.log(err);
        });
      // for(var i = 0;i<this.posts.length;i++){
      //   let pic = this.posts[i].post_image
      //   this.posts[i].post_image =require(`@/../api/uploads/${pic}`)
      // }
      console.log(this.posts);
    });
  }
};
</script>