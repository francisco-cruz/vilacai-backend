export interface CreateProdutoDTO {
  id: string
  name: string
  obs: string
  img: string
  price: number
  qntd_max_adicionais: number
  id_secao: string
}