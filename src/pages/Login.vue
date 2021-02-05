<template>
  <q-page class="bg-teal-1 row items-top justify-evenly">

    <user-component ref="user" v-show="false" v-on:authorized="sessaoAutenticada"></user-component>

    <div v-if="!authorized" class="col-12 q-pa-none">

      <div class="bg-teal text-white text-center q-pa-lg">
        <q-img
          src="~assets/servicos-locais.png"
          _srcset="~assets/servicos-locais.png 200w"
          sizes="(max-width: 320px) 100px, (max-width: 480px) 200px"
          width="100px"
        />
        <h1 class="text-h6 q-ma-none">Serviços Locais</h1>
        <p>Divulgue e Contate</p>
      </div>

      <div class="row">

        <div class="col-12 q-pa-lg">

          <h2 class="text-h5 text-center">Login</h2>
          <div class="login-form q-mt-lg">
            <h3 class="text-subtitle1 q-mb-lg">Entre com seus dados</h3>
            <q-form @submit="aoSubmeter" class="q-gutter-md">
              <q-input filled class="bg-white" v-model="email" type="email" label="Email" />
              <q-input filled class="bg-white" v-model="password" type="password" label="Senha" />
              <div class="text-right">
                <br />
                <q-btn
                  icon="login"
                  label="Entrar"
                  type="submit"
                  color="orange"
                  class="full-width"
                />
              </div>
            </q-form>
            <div class="q-mt-lg text-center">
              <p>
                Registrar uma
                <q-btn color="black" :outline="true" size="sm" label="Nova Conta"  @click="$router.push('/register')" />
              </p>
            </div>
          </div>

        </div>
      </div>
      <!-- row -->
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LocalStorage /* Notify, Loading,  Quasar, SessionStorage */ } from 'quasar'
import UserComponent from 'components/ClassUser.vue'

@Component({
  components: { UserComponent }
})
export default class PageLogin extends Vue {
  email = '';
  password = '';
  authorized = false

  sessaoAutenticada () {
    // Verifica status de usuário
    this.authorized = true
    // eslint-disable-next-line no-void
    void this.$router.push('/home')
  }

  aoSubmeter () {
    // Verifica se campos estão preenchidos
    if (this.email === '' || this.password === '') {
      // Erro em geral
      return this.$q.notify({
        message: 'Preencha todos os campos solicitados!',
        color: 'red'
      })
    }

    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    // eslint-disable-next-line no-void
    void this.$axios
      .post('/login', {
        email: this.email,
        password: this.password
      })
      .then((response:{status:number, data: { success:{ login:string, token:string, username:string }}}) => {
        // Se resposta foi ok
        if (response.status === 200 && response.data.success !== undefined) {
          // Exibir notificação
          this.$q.notify({
            message: 'Seja Bemvindo!',
            caption: response.data.success.login,
            color: 'green',
            position: 'center'
          })

          // Armazenar token
          LocalStorage.set('remember_token', response.data.success.token)
          LocalStorage.set('username', response.data.success.username)

          // Redirecionar para home
          // eslint-disable-next-line no-void
          void this.$router.push('/home')
        } else {
          // Erro em geral
          this.$q.notify({
            message: 'Houve erro ao submeter, tente mais tarde.',
            color: 'red'
          })
        }
      })

    // Fechar carregamento/loading
    this.$q.loading.hide()
  }
}
</script>
