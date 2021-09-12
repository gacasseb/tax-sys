import React, { useState } from 'react'

import { Descriptions, Input, Button, message } from 'antd'
import { rendimento } from '../data'
import axios from 'axios'

const { Search } = Input

export default function ConsultarEmpresa() {

    const [model, setModel] = useState({})
    const [search, setSearch] = useState('')

    const cnpjMask = (value) => {
        return value;
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const onSearch = () => {
        if ( ! search ) return;

        axios.get('http://localhost:80/api/empresa/' + search)
        .then( res => {
            if ( res.data ) {
                message.success('Empresa encontrada!')
                setModel(res.data);
            }
        })
        .catch( err => {
            setModel({})
            message.error('Empresa não encontrada.')
        })
    }

    const content = () => {
        if ( Object.keys(model).length !== 0 ) {
            return (
                <Descriptions title="Informações da empresa" bordered> 
                    <Descriptions.Item label="Nome da empresa" span={3}>{model.nome}</Descriptions.Item>
                    <Descriptions.Item label="CNPJ" span={3}>{model.cnpj}</Descriptions.Item>
                    {/* <Descriptions.Item label="E-mail" span={3}>{model.email}</Descriptions.Item> */}
                    {/* <Descriptions.Item label="Endereço" span={3}>{model.empresa.endereco}</Descriptions.Item> */}
                    {/* <Descriptions.Item label="Telefone" span={3}>{model.empresa.telefone}</Descriptions.Item> */}
                    {/* <Descriptions.Item label="Celular" span={3}>{model.empresa.celular}</Descriptions.Item> */}
                </Descriptions>
            )
        }
    }

    return (
        <>
            <Search style={{marginBottom: 50}} value={search} onChange={ e =>setSearch(e.target.value)} placeholder="Entre com o nome da empresa" onSearch={onSearch} enterButton />
            {content()}
        </>
    )
}