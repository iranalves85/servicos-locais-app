<template>
  <header class="authorized-header">
    <admob-banner-component v-if="$q.platform.is.capacitor"></admob-banner-component>
    <q-toolbar class="bg-teal text-white">
      <q-img
        src="~assets/servicos-locais.png"
        _srcset="~assets/servicos-locais.png 200w"
        sizes="(max-width: 320px) 30px, (max-width: 480px) 30px"
        width="30px"
      />
      <template v-if="username !== null">
        <q-toolbar-title>
          {{ username }}
        </q-toolbar-title>
        <q-btn class="text-right" :outline="true" size="md" color="white" icon="close" label="Sair" @click="sair" />
      </template>
      <q-toolbar-title v-else>
        <q-btn :outline="true" size="md" color="white" label="Fazer Login" @click="sair(); $router.push('/login')" />
      </q-toolbar-title>
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
  username:string|null = null
  public authorizeStatus = false// Deslogado

  beforeMount () {
    this.verificarAuth()
  }

  // Carregar token quando inicializar
  private verificarAuth () {
    if (!this.carregarToken()) return
    // Realiza requiisição
    // eslint-disable-next-line no-void
    void this.$axios.get('/authorized').then((response:{status:number, data:{success:{user:{name:string}}}}) => {
      // Retorna se requisição for diferente
      if (response.status !== 200) {
        console.log(response)
        return false
      }

      // Se resposta for false
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.data.success !== undefined) {
        // Atribuindo dados de resposta
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
    const token = LocalStorage.getItem('remember_token')

    if (token !== null) {
      // Atribuindo dados armazenados a var
      this.username = LocalStorage.getItem('username')

      // Setando headers
      this.setAxiosHeaders(token.toString())
      return true // token carregado
    } else {
      return false // token inexistente
    }
  }

  sair () {
    // Remove dados armazenados
    LocalStorage.remove('remember_token')
    LocalStorage.remove('username')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.$axios.defaults.headers.common.Authorization = ''

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
    this.$axios.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}
</script>
