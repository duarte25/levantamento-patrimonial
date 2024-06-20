import mongoose from "mongoose";

// Constantes que devem ser utilizadas sempre que lidar com permissões.
// Assim não tem como errar os nomes, e permite autocomplete funcionar

// Papéis Padrão - Mais podem ser criados e os existentes modificados, porém estes são necessários para funcionamento da aplicação
// Obs: Não seria interessante deletar do banco estes papéis.
export const GRUPO = {
  USUARIO: "USUARIO",
  SECRETARIO: "SECRETARIO",
  ADMINISTRADOR: "ADMINISTRADOR"
};

// Permissões - Quais permissões cada papel possuiL
// Basicamente representa cada Controller/Model.
export const PERM = {
  CAMPUS: "CAMPUS",
  INVENTARIO: "INVENTARIO",
  GRUPO: "GRUPO",
  ITEM: "ITEM",
  SETOR: "SETOR",
  USUARIO: "USUARIO"
};

// Ações - Cada ação define mais detalhadamente o que pode ser feito
export const ACAO = {
  TUDO: "TUDO",
  VER: "VER",
  CRIAR: "CRIAR",
  EDITAR: "EDITAR",
  DELETAR: "DELETAR"
};

const GrupoSchema = new mongoose.Schema({
  // Nome do grupo
  nome: {
    type: String,
    required: true,
    unique: true
  },
  // Nível do grupo, serve para decidir que grupos podem ser atribuídos, 
  // Um usuário com grupo de nível 1 só pode atribuir grupos de nível 0 para outros usuários 
  nivel: {
    type: Number,
    required: true,
    default: 0
  },
  // Se verdadeiro, não aparece na lista de grupos nem pode ser atribuído a usuários (Ex: USUARIO e ADMINISTRADOR)
  oculto: {
    type: Boolean,
    default: false
  },
  permissoes: [{
    _id: false,
    nome: { // qual permissão
      type: String,
      required: true
    },
    acoes: [{
      _id: false,
      nome: {
        type: String,
        required: true
      },
      // [opcional] Modificadores da ação, nem todas as ações possuem
      // Com esse modificador permite afetar coisas de qualquer usuário
      qualquer_usuario: {
        type: Boolean,
        default: undefined
      },
      // Com esse modificador permite acessar coisas de qualquer campus
      qualquer_campus: {
        type: Boolean,
        default: undefined
      },
      // Usado ao atribuir grupos, o padrão é que só pode atribuir grupos de nível menor que os próprios, 
      // com esse modificador pode atribuir grupos de qualquer nível
      qualquer_grupo: {
        type: Boolean,
        default: undefined
      },
    }]
  }]
});

const Grupo = mongoose.model("grupos", GrupoSchema);
export default Grupo;
