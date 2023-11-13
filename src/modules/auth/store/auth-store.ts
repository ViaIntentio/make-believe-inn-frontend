import { defineStore } from "pinia"
import { ApiService ,setAuthorizationHeader } from '@/app/services/api.service';
import router from "@/app/router";
import authConfig from '../config';

interface AuthStoreStateInterface {
    token: string | null,
    user: any
    [key: string]: any
}

interface LoginResponse {
    access_token: string,
    token_type: string,
    expires_in: number,
    [key: string]: any
}


export const useAuthStore = defineStore('auth',{
    state: (): AuthStoreStateInterface => ({
        user: null,
        token: null
    }),
    actions: {
        restToken() {
            this.token = null
        },
        async login(credentials: {email: string, password: string}) {
            const { data, fetch, error } = ApiService<LoginResponse>(authConfig.loginEndpoint, {
                method: 'post',
                data: {
                    ...credentials
                }
            })

            await fetch().catch((err) => {
                if(err.response){
                    if(err.response.status && err.response.status == 401){
                        throw 'Invalid credentials, try again.'
                    } else if(err.response.data.message) {
                        throw err.response.data.message
                    } else if(err.response.data.error) {
                        throw err.response.data.error
                    }
                }
                if(err.message){
                    throw err.message
                }
            })
            if(!(data) || !(data.value)){
                throw 'Failed to get token, try again.'
            }

            this.token = data.value.access_token

            return this.attemptAuth(this.token)
        },
        async attemptAuth(token: string | null) {
            // Setting Bearer token in axios
            token && setAuthorizationHeader(token)
            if(! token) {
                throw 'can\'t attempt auth request wihtout token'
            }

            const { data, fetch } = ApiService<any>(authConfig.tokenVerificationEndpoint, {
                method: 'post'
            })

            await fetch()
            if(!(data) || !(data.value)){
                this.restToken()
                throw 'failed to auth user'
            }

            this.user = data.value
            this.token = token
            router.push({name: 'auth.auth'})
        },

        async logout() {
            const { fetch } = ApiService(authConfig.logoutEndpoint, {method: 'post'})
            await fetch().then(() => {
                this.token = null
                this.user = null
                router.push({name: 'home'})
            })
        }
    }
})