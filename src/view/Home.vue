<template>
<div id="home">
    <div class="row">
        <div class="col"  v-bind:class="{responsive:resize}">
            <h1 id="hometext">&nbsp;&nbsp;&nbsp;&nbsp;DREAM,</h1>
            <h1 id="hometext">&nbsp;DISCOVER,</h1>
            <h1 id="hometext">EXPERIENCE!</h1>
            <br>
            <h2 id="text">Live more with wonders.</h2>
            <br>
            <br>
            <br>
            <h3 id="spotxt">Try SpotMe free for 30 days*</h3>
            <br>
            <br>
            <v-btn id="button" @click="submit">SpotMe Free</v-btn>
        </div>

        <v-card class="mx-auto1" max-width="400" height="200" align="bottom" v-bind:class="{transformer:resize}">
            <v-img src=" https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image4.jpg?raw=true" class="responsive-image" width="300" height="200"></v-img>
        </v-card>
        <v-card class="mx-auto2" max-width="300" height="200"  v-bind:class="{transformer:resize}" >
            <v-img src=" https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image5.jpg?raw=true" class="responsive-image" width="230" height="200" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto3" max-width="400" height="150"  v-bind:class="{transformer:resize}">
            <v-img src="https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image2.jpg?raw=true" class="responsive-image" width="200" height="150" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto4" max-width="400" height="150"  v-bind:class="{transformer:resize}">
            <v-img src="https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image3.jpg?raw=true" class="responsive-image" width="300" height="150" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto5" max-width="400" height="150"  v-bind:class="{transformer:resize}">
            <v-img src="https://res.cloudinary.com/thetripguru/image/upload/fl_lossy.progressive,e_improve/q_auto:low,c_scale,f_auto,dpr_auto,w_618/02-tours/gc1le2ca1r3k5zrpwqrx" class="responsive-image" width="170" height="190" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto6" max-width="400" height="188"  v-bind:class="{transformer:resize}">
            <v-img src="https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image8.jpg?raw=true" class="responsive-image" width="150" height="188" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto7" max-width="400" height="130"  v-bind:class="{transformer:resize}">
            <v-img src="https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image6.jpg?raw=true" class="responsive-image" width="300" height="130" aspect-ratio="1.3"></v-img>
        </v-card>
        <v-card class="mx-auto8" max-width="300" height="130"  v-bind:class="{transformer:resize}">
            <v-img src="https://github.com/Heavenjes/Final-Web3/blob/master/src/assets/image7.jpg?raw=true" class="responsive-image" width="180" height="130" aspect-ratio="1.3"></v-img>
        </v-card>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            resize: false
        }
    },
    methods: {
        submit: function (e) {
            e.preventDefault();
            this.$router.push("/login");
        },
        handleresize() {
            if (window.innerWidth < 1280) {
                this.resize = true

            } else {
                this.resize = false
            }
        }

    },
    created() {
        window.addEventListener("resize", this.handleresize);
        this.handleresize();
    },
    destroyed() {
        window.removeEventListener("resize", this.handleresize);
    }
};
</script>

<style scoped>
#hometext {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    font-weight: bold !important;
    font-size: 75px !important;
    margin-left: 70px !important;
    white-space: nowrap;
}

#text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    font-weight: normal !important;
    font-size: 35px !important;
    margin-left: 80px !important;
    line-height: 18px;
    white-space: nowrap;
}

#spotxt {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    font-weight: normal !important;
    font-size: 25px !important;
    margin-left: 100px !important;
    line-height: 0px;
    color: red;
    white-space: nowrap;
}

#button {
    position: absolute;
    width: 150px;
    height: 60px;
    background-color: gray;
    margin-left: 170px;
    border-radius: 20px;
    color: white;
    white-space: nowrap;
}

#button:hover {
    background-color: #3e8e41
}

#buton:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

#home {
    margin-top: 90px !important;
}

.mx-auto1 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-top: 5px;
    margin-left: 825px !important;
    position: absolute;
}

.mx-auto2 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 1163px !important;
    margin-top:-10px;
    position: absolute;

}

.mx-auto3 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 1101px !important;
    margin-top: 180px;
    position: absolute;

}

.mx-auto4 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 1040px !important;
    margin-top: 345px;
    position: absolute;

}

.mx-auto5 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 888px !important;
    margin-top: 225px;
    position: absolute;

}

.mx-auto6 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 732px !important;
    margin-top: 166px;
    position: absolute;

}

.mx-auto7 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 780px !important;
    margin-top: 420px;
    position: absolute;

}

.mx-auto8 {
    -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    margin-left: 610px !important;
    margin-top: 335px;
    position: absolute;

}

.responsive{
    float: unset !important;
    width: 120% !important;
}

.transformer{
     -ms-transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    transform: rotate(20deg);
    transform: unset !important;
    display:inline-block !important;
    position:unset !important;
    margin: 0 !important;
    
}
</style>