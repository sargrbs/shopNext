import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import {useQuery} from '@tanstack/react-query'

async function getData({queryKey}){
  const code = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAuxByCode/${code}`)

  return result
}


export default function AuxName(props) {

    const code = props.code

    const {data, isFetching, refetch, isFetched} = useQuery([`${props.queryName}`, code], getData, {refetchOnWindowFocus: false})

    return (
        <>{isFetching ? "Loaging" : <span>{data.data?.name}</span>}
            
        </>
    )
}