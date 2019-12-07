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
          <v-card-title id="title">Create Post</v-card-title>
        </div>
        <div>
          <v-card-text>
            <div id="text">
              <v-textarea v-model="description" outlined name="input-7-4" label="Description..."></v-textarea>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-file-input
              v-model="image"
              color="deep-purple accent-4"
              counter
              placeholder="Add Photo"
              prepend-icon="mdi-camera"
              :show-size="1000"
              accept="image/*"
              id="file"
              ref="myFiles"
               @change="encodeToBase64"
            ></v-file-input>
<!-- <input type="file" accept="image/*" @change="encodeToBase64" id="file"> -->
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
  //  props: {
  //     description: String,
  //     image: [],
  //     rating: Number,
  //     time: Date
  //   },
  data() {
    return {
      user_id: jwt_decode(localStorage.getItem("jwt"))._id,
      description: null,
      imageData: null,
      id: 0,
      dialog: false,
      
    };
  },
  methods: {
    encodeToBase64(event) {
      event.preventDefault();
      const file = event.target.files[0];
      const canvas = document.createElement("canvas");
      canvas.getContext("2d");
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          this.image = canvas
            .toDataURL("image/png")
            .replace(/^data:image\/(png|jpg);base64,/, "");
          // console.log("RESULT/png", this.image);
        };
        img.src = event.target.result;
        // console.log("RESULT!", img.src);
        var a = document.getElementById("file").value;
        var b = a.split("\\");
        this.imageData = { filename: b[2], image: img.src };
      };
      reader.readAsDataURL(file);
      var temp = document.getElementById("file").value.split("\\");
      this.file = temp[2];
      this.uploaded = true;
    },
    upload() {
      // var formData = new FormData();
      // formData.append("files", this.image);
      // formData.append(
      //   "details",
      //   JSON.stringify({
      //     post_text: this.description,
      //     account_id: this.user_id

      //   })
      // );
      let formData = {
        description: this.description,
        files: this.image,
      }
      axios
        .post("http://localhost:3000/bloggers/createPost", formData)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      // var object = {"id":this.id++, "description": this.description, "rating": 0}
      // this.$emit("upload_post", object)
      // console.log(object)
      // this.dialog = false;
    }
  },
  mounted() {}
};
</script>
