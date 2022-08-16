import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import {useQuery} from '@tanstack/react-query'

async function getData({queryKey}){
  const code = queryKey[1]
  const group = queryKey[2]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAuxByCode/${code}/?group=${group}`)

  return result
}


export default function AuxName(props) {

  const code = props.code
  const group = props.group

  const {data, isFetching, refetch, isFetched} = useQuery([`${props.queryName}`, code, group], getData, {refetchOnWindowFocus: false})

  return (
    <>
      
      {isFetching ? "Loaging" : data.data?.name}
        
    </>
  )
}