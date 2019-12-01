<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500" >
      <template v-slot:activator="{ on }">
        <v-btn color="black"  outlined dark v-on="on" id="createPostbtn">Create Post</v-btn>
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
            v-model="files"
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
           <v-btn color="secondary" outlined id="postbutton" @click="dialog = false">Cancel</v-btn>
          <v-btn color="secondary"  id="postbutton" >Post</v-btn>
        </v-card-actions>
      </div>
       
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
#createPostbtn{
    margin-left: 650px;
    margin-top:10px;
}
#title{
   color: black;
   font-weight: 1000;

}
</style>


<script>
export default {
  data() {
    return {
        dialog: false, 
      post: {
        
        description: ""
      }
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
    }
  }

  //   props: {
  //     id: Number,
  //     description: String,
  //     files: [],
  //     rating: Number,
  //     time: Date
  //   }
};
</script>
