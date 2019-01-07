<template>
    <div id="main">
        <Header/>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';

    export default {
        name: 'Main-App',
        components:{
          Header
        },
        data(){
            return {
            }
        },
        computed: {
            user(){
                return this.$store.getters.getProfile;
            },
            isAuthenticated(){
                return this.$store.getters.isAuthenticated;
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('authLogout')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        },
    }
</script>
