<template>

<nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container">
            <router-link class="navbar-brand" to="/">My Vue App</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  <template v-if="isAuthenticated == false">
                    <li>
                        <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'blog' }" class="nav-link">Blog</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                    </li>      
                    <li>
                        <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                    </li>
                  </template>
                  <template v-if="isAuthenticated == true" >
                    <li>
                        <router-link :to="{ name: 'services' }" class="nav-link">Services</router-link>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="UserDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.name}}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="UserDropdown">
                        <a class="dropdown-item" href="#" @click.prevent="logout">Sign Out</a>
                    </div>
                </li>
                  </template>       
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'app-header',
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
            logout(){
                this.$Progress.start();
                Swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Logout it!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch('authLogout')
                    .then(() => {
                        this.$router.push('/')
                        this.$Progress.finish();
                    })
                    Swal(
                        'Going out!',
                        'Your has been Logout.',
                        'success'
                    )       
                }
            }).catch(()=>{
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: '<a href>Why do I have this issue?</a>'
                        })
                        this.$Progress.fail();
                })
                     
            }     
        }
    }

</script>