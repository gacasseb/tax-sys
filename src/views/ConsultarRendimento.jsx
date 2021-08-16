import React, { useState } from 'react'

import { Descriptions, Input, Button, message } from 'antd'
import { rendimento } from '../data'

const { Search } = Input

export default function ConsultarRendimento() {

    const [model, setModel] = useState({})
    const [search, setSearch] = useState('')

    const cpfMask = (value) => {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const onSearch = () => {
        if ( ! search ) return;

        let result = rendimento.find(val => val.pessoa.cpf === search);

        if ( result ) {
            message.success('Contribuinte encontrado!')
            setModel(result);
            return;
        }

        setModel({})
        message.error('Não foi encontrado contribuinte com este CPF.');
    }

    const content = () => {
        if ( Object.keys(model).length !== 0 ) {
            return (
                <Descriptions title="Informações do rendimento" bordered> 
                    <Descriptions.Item label="Contribuinte" span={3}>{model.pessoa.nome}</Descriptions.Item>
                    <Descriptions.Item label="CPF" span={3}>{model.pessoa.cpf}</Descriptions.Item>
                    <Descriptions.Item label="Empresa" span={3}>{model.empresa.nome}</Descriptions.Item>
                    <Descriptions.Item label="CNṔJ" span={3}>{model.empresa.cnpj}</Descriptions.Item>
                    <Descriptions.Item label="Valor total recebido" span={3}>{`R$ ${model.valor_total}`}</Descriptions.Item>
                    <Descriptions.Item label="INSS" span={3}>{`R$ ${model.inss}`}</Descriptions.Item>
                    <Descriptions.Item label="IRRF Pago" span={3}>{`R$ ${model.irrf_pago}`}</Descriptions.Item>
                    <Descriptions.Item label="Valor 13 salário" span={3}>{`R$ ${model['13']}`}</Descriptions.Item>
                </Descriptions>
            )
        }
    }

    return (
        <>
            <Search style={{marginBottom: 50}} value={search} onChange={ e =>setSearch(cpfMask(e.target.value))} placeholder="Entre com o CPF do contribuinte" onSearch={onSearch} enterButton />
            {content()}
        </>
    )
}