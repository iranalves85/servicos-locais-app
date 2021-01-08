/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="row items-top justify-evenly">

    <user-component ref="user"></user-component>

    <div class="col-12 q-pa-lg">
      <div class="row">
        <div class="col-12">
          <h1 class="text-h6">Adicionar {{ pageTitle }}</h1>
          <q-form @submit="aoSubmeter" class="q-gutter-md">
            <div>
              <q-select
                v-model="unitySelected"
                v-if="unity"
                :options="unity.items"
                option-label="name"
                option-value="ID"
                label="Unidade"
                class="q-mb-md"
                filled
              />

              <q-select
                v-model="goalSelected"
                :options="goals"
                option-label="name"
                option-value="value"
                label="Eu quero:"
                class="q-mb-md"
                filled
              />

              <q-select
                filled
                label="Recursos"
                hint="Separate multiple values by [,;|]"
                v-model="resourcesSelected"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="filterFn"
              />

              <div class="row justify-content-around q-mt-md">
                <q-btn label="Enviar" type="submit" color="teal" class="full-width" />
              </div>

            </div>
          </q-form>
          <q-space />
        </div>
      </div>
      <!-- row -->
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
// import { Quasar } from 'quasar'
import MainUnity from '../class/MainUnity.vue'
import MainRequest from '../class/MainRequest.vue'
import UserComponent from 'components/ClassUser.vue'

const stringOptions:string[] = []

@Component({
  components: { UserComponent }
})
export default class PageAddRequest extends MainRequest {
  // Tipo de requisição => 1 = Serviço, 2 => Produto, 3 => Projeto
  protected type = 1
  protected pageTitle = 'Requisição'

  // opções de metas
  protected goals:unknown = [
    { name: 'Meta 1', value: 1 }
  ]

  // Unidades
  unity:MainUnity = new MainUnity()

  // filtro recursos
  filterOptions:string[] = stringOptions

  // campos selecionados
  unitySelected = { ID: '' }
  goalSelected = { name: '' }
  resourcesSelected:unknown[] = []

  beforeMount () {
    this.carregarUnidades()
  }

  carregarUnidades () {
    // Carregando items através do componente
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.unity.carregarItems()
  }

  aoSubmeter () {
    // Adicionando dados a propriedade
    this.solicitacao = {
      unity_id: this.unitySelected.ID,
      goal: this.goalSelected.name,
      type: this.type,
      items: this.resourcesSelected
    }

    // Fazendo requisição 'post'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.enviarSolicitacao()
  }

  /** Funcionamento de select qchip */
  createValue (val:string, done: (arg0: null) => void) {
    // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
    // and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
    // only if is not already set and it resets the input textbox to empty string
    // ----
    // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
    // (adds to model if not already in the model, removes from model if already has it)
    // and it resets the input textbox to empty string
    // ----
    // If "var" content is undefined/null, then it doesn't tampers with the model
    // and only resets the input textbox to empty string

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (val.length > 0) {
      const model:unknown[] = (this.resourcesSelected || []).slice()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      val
        .split(/[,;|]+/)
        .map((v:string) => v.trim())
        .filter((v:string) => v.length > 0)
        .forEach(v => {
          if (stringOptions.includes(v) === false) {
            stringOptions.push(v)
          }
          if (model.includes(v) === false) {
            model.push(v)
          }
        })

      done(null)
      this.resourcesSelected = model
    }
  }

  /** Funcionamento de select qchip */
  filterFn (val: string, update: (arg0: () => void) => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    update(() => {
      if (val === '') {
        this.filterOptions = stringOptions
      } else {
        const needle = val.toLowerCase()
        this.filterOptions = stringOptions.filter(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (v:string) => v.toLowerCase().indexOf(needle) > -1
        )
      }
    })
  }
}
</script>
