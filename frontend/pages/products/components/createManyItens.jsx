import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {v4 as uuidv4} from 'uuid'


async function getData({queryKey}){
    const code = queryKey[1]
    const url = process.env.AXIOS_URL
    const result = await axios.get(`${url}getProduct/${code}`)
  
    return result
}

async function getAuxId(code, group){
    const url = process.env.AXIOS_URL
    const getId = await axios.get(`${url}getAuxId/?code=${code}&group=${group}`)
    return getId.data.id
}

async function getAuxName(code, group){
    const url = process.env.AXIOS_URL
    const getId = await axios.get(`${url}getAuxId/?code=${code}&group=${group}`)

    return getId.data.name
}

export default async function createManyItens(props){

        const url = process.env.AXIOS_URL        
        const data = await axios.get(`${url}getProduct/${props.code}`)
      

        const productId = uuidv4()
            
        if(props.type === 1){
            const variations = await Promise.all(data.data.grid.dados.lista?.map( async (product, index)  => 
               
                {
                    let colorName = await getAuxName(product.codigoCor, 'cores')
                    let weightName = await getAuxName(product.codigoTamanho, 'tamanhos')
                    let variationName = colorName + '-' + weightName
                    let coresId =  await getAuxId(product.codigoCor, 'cores')
                    let tamanhosId =  await getAuxId(product.codigoTamanho, 'tamanhos')
                
                    return {
                        id:  uuidv4(),
                        name:  variationName,
                        code: product.codigoCompleto,
                        productStock:{
                            create: {
                                id: uuidv4(),
                                quantity: product.estoqueAtual,
                                product: {
                                    connect: {id: productId}
                                }
                            }
                        },
                        auxs: {
                            create: [
                            {
                                assignedBy: colorName + '-' + weightName,
                                assignedAt: new Date(),
                                aux: {
                                    connect: {id: coresId},
                                    
                                }
                            },
                            {
                                assignedBy: weightName + '-' + colorName,
                                assignedAt: new Date(),
                                aux:{
                                    connect: {id: tamanhosId},
                                }
                            }
                        ]
                        
                        },
                    }
                }
            ))
            const product = {
                createProduct: {
                    id: productId,
                    code_default: Number(data.data.productDetail?.dados.codigo),
                    name: data.data.productDetail?.dados.nome,
                    type: data.data.productDetail?.dados.tipo,
                    gtin: data.data.productDetail?.dados.codigoBarras,
                    nettWeight: data.data.productDetail?.dados.pesoLiquido,
                    grossWeight: data.data.productDetail?.dados.pesoBruto,
                    height: data.data.productDetail?.dados.altura,
                    width: data.data.productDetail?.dados.largura,
                    length: data.data.productDetail?.dados.comprimento,
                    currentsupply: data.data.productDetail?.dados.estoqueAtual,
                    detailurl:  data.data.productDetail?.dados.urlDetalhe,
                    urldetailstock: data.data.productDetail?.dados.urlEstoqueDetalhe,
                    urlpricetable: data.data.productDetail?.dados.urlTabelaPreco,
                    urloffers: data.data.productDetail?.dados.urlPromocoes,
                    urlpics: data.data.productDetail?.dados.urlFotos,
                    // price: itemPrice,
                    auxs: {
                        create: [
                            {
                                assignedBy: data.data.productDetail?.dados.nome,
                                assignedAt: new Date(),
                                aux:{
                                    connect:
                                        {id: await getAuxId(data.data.productDetail?.dados.codigoClasse, 'classes')},
                                    
                                }
                            },
                            {
                                assignedBy: data.data.productDetail?.dados.nome,
                                assignedAt: new Date(),
                                aux:{
                                    connect:
                                        {id: await getAuxId(data.data.productDetail?.dados.codigoFabricante, 'fabricantes')},
                                    
                                }
                            }
                        ]
                        
                    },
                    ProductVariations: {
                        create: variations
                    }
                }
            }
            return product
        }else{
            const totalStock = data.data.product?.dados.estoqueFiliais?.map(filial => Number(filial.estoqueAtual)).reduce((prev, curr) => prev + curr, 0)
        
            const product = {
                createProduct: {
                    id: uuidv4(),
                    code_default: Number(data.data.productDetail?.dados.codigo),
                    name: data.data.productDetail?.dados.nome,
                    type: data.data.productDetail?.dados.tipo,
                    gtin: data.data.productDetail?.dados.codigoBarras,
                    nettWeight: data.data.productDetail?.dados.pesoLiquido,
                    grossWeight: data.data.productDetail?.dados.pesoBruto,
                    height: data.data.productDetail?.dados.altura,
                    width: data.data.productDetail?.dados.largura,
                    length: data.data.productDetail?.dados.comprimento,
                    currentsupply: data.data.productDetail?.dados.estoqueAtual,
                    detailurl:  data.data.productDetail?.dados.urlDetalhe,
                    urldetailstock: data.data.productDetail?.dados.urlEstoqueDetalhe,
                    urlpricetable: data.data.productDetail?.dados.urlTabelaPreco,
                    urloffers: data.data.productDetail?.dados.urlPromocoes,
                    urlpics: data.data.productDetail?.dados.urlFotos,
                    // price: itemPrice,
                    auxs: {
                        create: [
                            {
                                assignedBy: data.data.productDetail?.dados.nome,
                                assignedAt: new Date(),
                                aux:{
                                    connect:
                                        {id: await getAuxId(data.data.productDetail?.dados.codigoClasse, 'classes')},
                                    
                                }
                            },
                            {
                                assignedBy: data.data.productDetail?.dados.nome,
                                assignedAt: new Date(),
                                aux:{
                                    connect:
                                        {id: await getAuxId(data.data.productDetail?.dados.codigoFabricante, 'fabricantes')},
                                    
                                }
                            }
                        ]
                    },
                    ProductStock: {
                        create:{
                            id: uuidv4(),
                            quantity: totalStock
                        }
                    }

                }
            }
            return product
        }
    

}