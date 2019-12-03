<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500" >
      <template v-slot:activator="{ on }">
        <v-btn color="black"  outlined dark v-on="on" id="createPostbtn" v-show="$route.path === '/bloggerdashboard'">Create Post</v-btn>
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
          <v-btn color="secondary"  id="postbutton" @click="upload">Post</v-btn>
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
   props: {
      description: String,
      files: [],
      rating: Number,
      time: Date
    },
  data() {
    return {
      id: 0,
      dialog: false
    };
  },
  methods: {
    upload(){
      var object = {"id":this.id++, "description": this.description, "rating": 0}
      this.$emit("upload_post", object )
      console.log(object)
      this.dialog = false;
    }
  
  }
}

</script>
