<template>
  <v-img
    class="white--text align-end"
    height="100px"
    id="image"
    src="@/assets/back1.jpg"
  >
    <v-card
      id="card"
      class="mx-auto"
      max-width="500"
    >
      <div id="title">
        <v-avatar
          id="circle"
          size="150"
        >
          <v-icon
            dark
            size="600%"
          >mdi-account</v-icon>
        </v-avatar>
      </div>
      <v-form lazy-validation ref="form" id="form">
        <center>
          <v-text-field v-model="credentials.uname" :rules="[rules.required]" label="Username"
            required
            :prepend-icon="'mdi-account'"
          ></v-text-field>
          <v-text-field
            v-model="credentials.password"
            :rules="[rules.required]"
            label="Password"
            required
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
            :prepend-icon="'mdi-key-variant'"
          ></v-text-field>
          <p style="color:red">{{message}}</p>
          <br />
          <v-btn
            id="submit"
            class="secondary justify-center"
            @click="submit"
          >Login</v-btn>
          <br />
          <br />
          <v-card-text>"Forgot password?"</v-card-text>
          <v-card-text>
            "Don't have account yet?
            <a @click="redirect('/register')">Sign up here</a>!"
          </v-card-text>
        </center>
      </v-form>
    </v-card>
  </v-img>
</template>

<script>
import AUTH from "@/auth";
export default {
  data: () => {
    AUTH;
    return {
      message: "",
      credentials: {
        uname: "",
        password: ""
      },
      show: false,
      checkbox: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },

  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("loginAsync", this.credentials )
          .then((response) => {
            if(response){
              this.$router.push("/dashboard")
            }
          })
          .catch(err => console.log(err));
      } else {
        alert("all fields are required!");
      }
    },
    redirect(router) {
      this.$router.push(router);
    },
    handleresize() {
      if (window.innerWidth < 1280) {
        this.resize = true;
      } else {
        this.resize = false;
      }
    },
    created() {
      window.addEventListener("resize", this.handleresize);
      this.handleresize();
    },
    destroyed() {
      window.removeEventListener("resize", this.handleresize);
    }
  }
};
</script>

<style scoped>
#card {
  float: center;
  position: relative;
  margin-bottom: 230px;
  background: linear-gradient(to bottom, #cd853f 0%, #ffffff 100%);
  border-radius: 25px;
  border: double rgb(24, 14, 14) 1px;
}
#title {
  position: absolute;
  text-align: center;
  border-radius: 10%;
  top: -90px;
  left: 35%;
  z-index: 2;
}
#circle {
  background: black;
}
#form {
  padding-top: 10%;
  padding-bottom: 5%;
  width: 450px;
  margin-left: 20px;
}
</style>

