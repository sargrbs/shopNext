import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import {useQuery} from '@tanstack/react-query'

async function getData({queryKey}){
  const code = queryKey[1]
  console.log(code, 'code')
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getImage/?code=${code.codigo}&position=${code.posicao}`)

  return result
}


export default function ShowImage(props) {

    const code = props.url

    const {data, isFetching, refetch, isFetched} = useQuery(['imageProductShow', code], getData, {refetchOnWindowFocus: false})
    console.log(data, 'img')
    return (
        <>
            image
        </>
    )
}