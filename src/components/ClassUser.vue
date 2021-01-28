<template>
  <header class="authorized-header">
    <admob-banner-component v-if="!$q.platform.is.capacitor"></admob-banner-component>
    <q-toolbar class="bg-teal text-white">
      <q-img
        src="~assets/servicos-locais.png"
        _srcset="~assets/servicos-locais.png 200w"
        sizes="(max-width: 320px) 30px, (max-width: 480px) 30px"
        width="30px"
      />
      <q-toolbar-title v-if="username">
        {{ username }}
      </q-toolbar-title>
      <q-btn class="text-right" :outline="true" size="sm" color="white" icon="close" label="Sair" @click="sair" />
    </q-toolbar>

  </header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LocalStorage /* , Quasar, SessionStorage */ } from 'quasar'
import AdmobBannerComponent from 'components/AdmobBanner.vue'

@Component({
  components: { AdmobBannerComponent }
})
export default class ClassUser extends Vue {
  username:string|null = ''
  private user:unknown
  public authorizeStatus = false// Deslogado

  beforeMount () {
    this.carregarToken()
  }

  // Carregar token quando inicializar
  private verificarAuth () {
    // Realiza requiisição
    // eslint-disable-next-line no-void
    void this.$axios.get('/authorized').then((response:{status:number, data:{success:{user:{name:string}}}}) => {
      // Retorna se requisição for diferente
      if (response.status !== 200) return false

      // Se resposta for false
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.data.success !== undefined) {
        // Atribuindo dados de resposta
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.user = response.data.success.user
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.username = response.data.success.user.name

        // Se nome de resposta for diferente do armazenado na aplicação = atualizar
        if (this.username !== LocalStorage.getItem('username')) {
          LocalStorage.set('username', this.username)
        }

        this.authorizeStatus = true
        this.$emit('authorized', true)
      }
    })
  }

  private carregarToken () {
    // Carregar token registrado localmente
    const token = LocalStorage.getItem('api_token')

    if (token) {
      // Atribuindo dados armazenados a var
      this.verificarAuth()
      this.username = LocalStorage.getItem('username')

      // Setando headers
      this.setAxiosHeaders(token.toString())
    } else {
      this.sair()
    }
  }

  private sair () {
    // Remove dados armazenados
    LocalStorage.remove('api_token')
    LocalStorage.remove('username')

    // Emite evento
    this.$emit('logged_out', true)

    // Verifica se página atual é diferente de login e redireciona
    const current = this.$router.currentRoute
    if (current.path === '/login' || current.path === '/' || current.path === '/register') {
      // Não fazer nada, permanecer na página
    } else {
      // Redirecionar para página de login
      // eslint-disable-next-line no-void
      void this.$router.push('/login')
    }
  }

  protected setAxiosHeaders (token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common['Content-Type'] = 'application/json'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.API
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common.Authorization = 'Bearer ' + token
    this.$axios.defaults.withCredentials = false
    this.$axios.defaults.baseURL = process.env.API
  }
}
</script>
