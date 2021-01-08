declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
   // Aplicação Constantes
    API_URL: 'http://localhost/desenvolvimento/servicos-locais/backend/app/public';
    API_IBGE: 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/{municipio}/distritos'; 
    MUNICIPIO: '3550308';// São Paulo - SP 
  }
}
