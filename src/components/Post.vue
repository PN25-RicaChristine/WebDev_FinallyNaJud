<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          color="black"
          outlined
          dark
          v-on="on"
          id="createPostbtn"
          v-show="$route.path === '/bloggerdashboard'"
        >Create Post</v-btn>
      </template>
      <v-card class="px-2">
        <div>
          <!-- Create Post -->
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="orange lighten-1 accent-4"
          ></v-progress-linear>
          <v-card-title id="title">Create Post</v-card-title>
        </div>
        <div>
          <v-card-text>
            <div id="text">
              <v-textarea v-model="description" outlined name="input-7-4" label="Description..."></v-textarea>
            </div>
          </v-card-text>
          <v-card-actions>
            <input type="file" accept="image/*" @change="encodeToBase64" id="file" />
            <v-spacer></v-spacer>

            <!-- Post Button -->
            <v-btn color="secondary" outlined id="postbutton" @click="dialog = false">Cancel</v-btn>
            <v-btn color="secondary" id="postbutton" @click="upload">Post</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
#createPostbtn {
  margin-left: 650px;
  margin-top: 10px;
}
#title {
  color: black;
  font-weight: 1000;
}
</style>


<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      user_id: jwt_decode(localStorage.getItem("jwt"))._id,
      description: null,
      imageData: null,
      id: 0,
      dialog: false,
      loading: false
    };
  },
  methods: {
    encodeToBase64(event) {
      const file = event.target.files[0];
      this.imageData = file;
    },
    upload() {
      this.loading = true;
      console.log(this.imageData.name);
      let datas = {
        post_blogger: sessionStorage.getItem("Name"),
        post_text: this.description,
        post_image: this.imageData.name
      };

      let formData = new FormData();
      formData.append("post_image", this.imageData);
      axios
        .post("http://localhost:3000/bloggers/uploadfile", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
          axios
            .post("http://localhost:3000/bloggers/createPost", datas)
            .then(res => {
              this.loading = false;
              this.dialog = false;
              // window.location.reload()
              console.log(res);
              this.$emit("uploaded" ,res.data)
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>
