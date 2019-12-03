<template>
<v-card class="mx-auto" max-width="1000">
    <v-row justify="space-around">
        <div>
            <input type="file" ref="file" name="file" class="choose" @change="onSelect()">
        </div>
        <div>
            <v-avatar size="250" class="profile">
                <img id="img" :src="this.image" />
            </v-avatar>
        </div>
    </v-row>

    <v-card class="mx-auto1" dark max-width="470">
        <div class="jumbotron">
            <v-card-title>
                <span class="per">My Account</span>
            </v-card-title>
        </div>
        <v-card-text>
            <br>
            <h2>Name:</h2>
            <hr>
            <br>
            <br>
            <h2>Username:</h2>
            <hr>
            <br>
            <br>
            <h2>Email:</h2>
            <hr>
            <br>
            <br>
            <h2>Password:</h2>
            <hr>
            <br>
            <br>
        </v-card-text>
        <br>
        <v-btn large color="primary" class="button1">Edit</v-btn>
    </v-card>
</v-card>
</template>

<style scoped>
.mx-auto {
    margin-top: 5%;
    height: 500px;
    width: 900px;
    background-color: #e5e5e5;
}

.profile {
    margin-top: 20%;
    margin-left: -205%;
}

.title {
    font-size: 20px;
}

.button {
    margin-top: 8%;
    margin-left: -170%;
}

.button1 {
    margin-top: -20%;
    margin-left: 45%;
}

.mx-auto1 {
    margin-top: -38.5%;
    margin-left: 48%;
    height: 500px;
    width: 500px;
    background-color: white;
}

h2 {
    font-family: cursive;
    color: #000;

}

.choose {
    margin-top: 120%;
}

.per {
    font-family: cursive;
    color: white;
    font-size: 1.2em;
}

hr {
    width: 70%;
    margin-left: 25%;

}

img{
    height:auto;
    width:100%;
}

.jumbotron {
    padding: -800%;
    text-align: center;
    background-color: brown;
}

#cam {
    margin-right: 55%;
    margin-top: 20%;
}
</style>

<script>
import $ from 'jquery';
export default {
    data() {
        return {
            image: "data:image/jpeg;base64,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"
        }
    },

    methods: {

        onSelect() {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Filetype is wrong!!";
            }
            if (file.size > 500000) {
                this.message = "Too large, max size allowed is 500kb";
            }
            var img = URL.createObjectURL(file);
            //this.file = img;
            $("#img").attr("src", img);
        }

    }
}
</script>
