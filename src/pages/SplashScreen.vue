<template>
  <q-page class="bg-white row items-top justify-evenly">

      <user-component ref="user" v-show="false" v-on:authorized="sessaoAutenticada"></user-component>

      <div class="col-12 q-pa-none">

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

        <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="teal"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          arrows
          height="75%"
          class="bg-white text-teal rounded-borders q-pa-none q-ma-none"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="business" size="56px" />
            <div class="q-mt-md text-center text-h6 text-grey">
              Cadastre projetos, serviços ou produtos de sua empresa gratuitamente.
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="email" size="56px" />
            <div class="q-mt-md text-center text-h6 text-grey">
              Receba e divulgue seus contatos com outros usuários em sua região.
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="login" class="column no-wrap flex-center">
            <q-icon name="attach_money" size="56px" />
            <div class="q-mt-md q-mb-lg text-center text-h6 text-grey">
              <h3 class="text-h3 q-ma-none q-mb-md">Comece agora mesmo!</h3>
              Realize contatos e feche negócios sem pagar nada!
            </div>
            <q-btn class="full-width q-mb-md" color="teal" icon="login" label="Fazer Login" @click="$router.push('login')" />

            <q-btn class="full-width" color="teal" icon="assignment_ind" label="Criar Acesso" @click="$router.push('register')" />

          </q-carousel-slide>
        </q-carousel>
      </div>

  </q-page>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QCarousel, QCarouselControl, QCarouselSlide } from 'quasar'
import UserComponent from 'components/ClassUser.vue'

@Component({
  components: { QCarousel, QCarouselControl, QCarouselSlide, UserComponent }
})
export default class PageSplashScreen extends Vue {
  slide = 'style'

  sessaoAutenticada () {
    // Verifica status de usuário
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.$router.push('/home')
  }
}
</script>
