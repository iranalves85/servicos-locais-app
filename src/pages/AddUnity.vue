<template>
  <q-page class="row items-top justify-evenly">

    <user-component ref="user"></user-component>

    <div class="col-12 q-pl-lg q-pr-lg">

      <h1 class="text-h6">Adicionar Unidade</h1>
      <q-form @submit="aoSubmeter()" class="q-gutter-md">
        <div>
          <q-input class="q-mb-xs" outlined bg-color="white" color="teal" label-color="teal" v-model="name" type="text" label="Nome Estabelecimento" />
          <q-input class="q-mb-xs" outlined bg-color="white" color="teal" label-color="teal" v-model="zipcode" type="number" label="CEP" mask="#####-###" :unmasked-value="true" @keyup="carregarCEP()" />
          <q-input class="q-mb-xs" outlined bg-color="white" color="teal" label-color="teal" v-model="address" type="text" label="Rua/Avenida" :disable="true" />

          <div class="row justify-content-around q-mt-xs q-mb-xs">
            <div class="col-5">
              <q-input outlined bg-color="white" color="teal" label-color="teal" v-model="number" type="number" label="Número" />
            </div>
            <div class="col-7">
              <q-input outlined bg-color="white" color="teal" label-color="teal" v-model="complement" type="text" label="Complemento" class="q-ml-xs" />
            </div>
          </div>

          <q-input class="q-mb-xs" outlined bg-color="white" color="teal" label-color="teal" v-model="neighborhood" type="text" label="Bairro" :disable="true" />
          <q-input class="q-mb-xs" outlined bg-color="white" color="teal" label-color="teal" v-model="city" type="text" label="Cidade" :disable="true" />
          <q-select
            v-model="state"
            :options="options"
            label="Estado"
            class="q-mb-xs"
            outlined bg-color="white" color="teal" label-color="teal"
          />

          <div class="row justify-content-around q-mt-md">
            <q-btn label="Enviar" type="submit" color="orange" class="full-width" />
          </div>

        </div>
      </q-form>
      <q-space />
    </div>

  </q-page>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
// import { Quasar } from 'quasar'
import UnityComponent from 'components/ClassUnity.vue'
import UserComponent from 'components/ClassUser.vue'
import MainUnity from 'src/class/MainUnity.vue'

const stateList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF']

@Component({
  components: { UnityComponent, UserComponent }
})
export default class AddUnity extends MainUnity {
  options:unknown = stateList
  name = ''
  address = ''
  number = '0'
  complement = ''
  neighborhood = ''
  city = ''
  state:unknown = ''
  zipcode = ''

  carregarCEP () {
    if (this.zipcode.search(/[0-9]{5}-?[0-9]{3}/) > -1) {
      // eslint-disable-next-line no-void
      void this.$axios.get('location/zipcode/' + this.zipcode).then((response:{status:number, data:{logradouro:string, bairro:string, localidade:string, uf:string}}) => {
        if (response.status === 200 && response.data !== undefined) {
          this.address = response.data.logradouro
          this.neighborhood = response.data.bairro
          this.city = response.data.localidade
          this.state = response.data.uf
        }
      })
    }
  }

  carregarListaEstados () {
    // eslint-disable-next-line no-void
    void this.$axios.get('location/state').then(function (response:{status:number, data:[{sigla:string}]}) {
      if (response.status === 200 && response.data) {
        for (const iterator of response.data) {
          stateList.push(iterator.sigla)
        }
      }
    })
  }

  aoSubmeter () {
    // Atribuindo dados a propriedade
    this.solicitacao = {
      name: this.name,
      address: this.address,
      number: this.number,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode
    }

    // Executando submissão
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.enviarSolicitacao()
  }
}
</script>
