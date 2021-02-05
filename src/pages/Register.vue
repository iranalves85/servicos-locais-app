<template>
  <q-page class="bg-white row items-top justify-evenly">

    <q-header reveal elevated bordered class="bg-teal">
      <q-btn color="white" flat icon="arrow_back" label="Voltar" @click="$router.back()" />
    </q-header>

    <div class="col-12 q-pa-lg">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center text-h4">Registrar Acesso</h1>

          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >

            <div class="text-right">
              <!--<q-select filled class="q-mb-xs" v-model="type" :options="options" label="Tipo de Usuário" />-->
              <q-input outlined bg-color="white" color="teal" label-color="teal" class="q-mb-xs" v-model="name" type="text" label="Nome da Empresa" />
              <q-input outlined bg-color="white" color="teal" label-color="teal" class="q-mb-xs" v-model="email" type="email" label="Email" />
              <q-input outlined bg-color="white" color="teal" label-color="teal" class="q-mb-xs" v-model="password" type="password" label="Senha" />
              <q-input outlined bg-color="white" color="teal" label-color="teal" class="q-mb-xs" v-model="confirmPassword" type="password" label="Confirmar Senha" />
            </div>
            <div class="q-mt-md">
              <q-scroll-area style="height: 250px;">
                <h2 class="text-subtitle1 text-weight-medium"><q-checkbox v-model="accept" label="Termos e Condições" /></h2>
                <p class="text-body2 text-grey-7 text-justify">
                  Ao submeter seu registro você esta concordando que armazenamos seus dados informados em nossa plataforma, com a principal propósito de utilizar como forma de autenticação. De modo que se posteriormente desejar a remoção de seus dados o mesmo deverá entrar em contato pelo email <a href="mailto:makingpie.mkt@gmail.com">makingpie.mkt@gmail.com</a>, após a remoção destas informações ficará permanentemente impossibilitado de ingressar na plataforma.
                </p>
                <p class="text-body2 text-grey-7 text-justify">
                  Não é permitido a inserção de conteúdo ofensivo, preconceituoso ou que possa ofender a si mesmo ou a terceiros. A MakingPie não se responsabiliza pelo conteúdo e opiniões inseridas e não representam de forma nenhuma o posicionamento do aplicativo.
                </p>
              </q-scroll-area>
            </div>
            <div>
              <q-btn type="submit" class="full-width" color="orange" icon="login" label="Registrar" />
            </div>

          </q-form>

        </div>
      </div><!-- row -->
    </div>

  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { /* Notify, Loading, Quasar, */ LocalStorage } from 'quasar'

@Component({
  components: { }
})
export default class PageRegister extends Vue {
  options:unknown = [{ label: 'Empresa', value: 1 }, { label: 'Fornecedor', value: 2 }]
  type = {
    label: 'Empresa',
    value: 1
  }

  name = ''
  email = ''
  password = ''
  confirmPassword = ''
  accept = false

  onSubmit () {
    // Verifica se campos estão preenchidos
    if (this.name === '' || this.email === '' ||
      this.password === '' || this.confirmPassword === '') {
      // Erro em geral
      return this.$q.notify({
        message: 'Preencha todos os campos solicitados!',
        color: 'red'
      })
    }

    // Verifica se campos estão preenchidos
    if (this.accept === false) {
      // Erro em geral
      return this.$q.notify({
        message: 'Você continuar é necessário aceitar os "Termos e Condições".',
        color: 'red'
      })
    }

    // Mostrar carregamento/loading
    this.$q.loading.show({
      delay: 400 // ms
    })

    // Montando dados
    const data = {
      type: this.type.value,
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirmPassword
    }

    // Executa requisição
    // eslint-disable-next-line no-void
    void this.$axios.post(String(process.env.API) + '/register', data).then((response:{status:number, data:{success: {login:string, token:string, username:string}, error: {register:string}}}) => {
      // Se resposta foi ok
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.status === 200 && typeof response.data === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const success = response.data.success
        // Exibir notificação
        this.$q.notify({
          message: 'Seja Bemvindo!',
          caption: success.login, // Retorna de login se cadastro foi sucesso
          color: 'green',
          position: 'center'
        })

        // Armazenar token
        LocalStorage.set('remember_token', success.token)
        LocalStorage.set('username', success.username)

        // Redirecionar para home
        // eslint-disable-next-line no-void
        void this.$router.push('/home')
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const error = response.data.error
        // Erro em geral
        this.$q.notify({
          message: error.register,
          color: 'red'
        })
      }
    })

    // Fechar carregamento/loading
    this.$q.loading.hide()
  }
}
</script>
