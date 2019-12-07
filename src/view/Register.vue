<template>
  <v-img
    class="white--text align-end"
    height="100px"
    src="@/assets/back1.jpg"
  >
    <div>
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
            >mdi-account-plus</v-icon>
          </v-avatar>
        </div>
        <v-form
          ref="form"
          id="form"
          lazy-validation
        >
          <center>
            <v-text-field
              v-model="credentials.name"
              :rules="[rules.required]"
              label="Name"
              required
              :prepend-icon="'mdi-account'"
            ></v-text-field>
            <v-text-field
              v-model="credentials.uname"
              :rules="[rules.required]"
              label="Username"
              required
              :prepend-icon="'mdi-account'"
            ></v-text-field>
            <v-text-field
              v-model="credentials.email"
              :rules="[rules.required]"
              label="E-mail"
              type="email"
              required
              :prepend-icon="'mdi-mail'"
            ></v-text-field>
            <v-text-field
              v-model="credentials.password"
              :rules="[rules.required]"
              label="Password"
              required
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show= !show"
              :type="show ? 'text' : 'password'"
              :prepend-icon="'mdi-key-variant'"
            ></v-text-field>
            <v-text-field
              v-model="credentials.conpassword"
              :rules="[rules.required ,rules.matchPassword]"
              label="Confirm Password"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1= !show1"
              :type="show1 ? 'text' : 'password'"
              :prepend-icon="'mdi-key-variant'"
            ></v-text-field>
            <v-select
              :items="items"
              :prepend-icon="'mdi-account-plus'"
              v-model="credentials.type"
              label="User Type"
              required
            />
            <v-btn
              id="submit"
              class="secondary justify-center"
              @click="validate"
            >Register</v-btn>
            <v-card-text>
              "Already have an account?
              <a @click="redirect('/login')">Log in</a>!"
            </v-card-text>
          </center>
        </v-form>
      </v-card>
    </div>
  </v-img>
</template>
<style scoped>
#card {
  float: center;
  position: relative;
  background: linear-gradient(to bottom, #cd853f 0%, #ffffff 100%);
  border-radius: 25px;
  border: solid black 1px;
  bottom: 20px;
}
#title {
  position: absolute;
  text-align: center;
  border-radius: 10px;
  top: -95px;
  left: 165px;
  z-index: 2;
}
#circle {
  background: black;
}
#form {
  padding-top: 40px;
  width: 450px;
  margin-left: 20px;
}
</style>






<script>
import AUTH from "@/auth";
export default {
  data() {
    return {
      items: ["User", "Blogger"],
      auth: AUTH,
      credentials: {
        name: "",
        uname: "",
        email: "",
        password: "",
        conpassword: "",
        type: ""
      },
      show: false,
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        matchPassword: () =>
          this.credentials.password === this.credentials.conpassword ||
          "Password did not match!"
      }
    };
  },
  methods: {
    validate: function(e){
      e.preventDefault();


        AUTH.register(this.credentials.email, this.credentials.password);
    
      if (this.$refs.form.validate()) {
        let data = {
          name: this.credentials.name,
          username: this.credentials.uname,
          password: this.credentials.password,
          email: this.credentials.email,
          userType: this.credentials.type,
        };
        this.$store
          .dispatch("registerAsync", data)
          .then(() => this.$router.push("/login"))
          .catch(err => console.log(err));
      }else{
       alert("naa kay sayop!")
      }
    },
    redirect(router) {
      this.$router.push(router);
    }
  }
};
</script>