import React, { useState } from 'react'

import { rendimento } from '../data'
import axios from 'axios';

import { Descriptions, Input, Button, message, Collapse } from 'antd';
const { Panel } = Collapse;

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

        // let result = rendimento.find(val => val.pessoa.cpf === search);

        let cpf = search.split('.').join('');
        cpf = cpf.split('-').join('')
        axios.get('http://localhost:80/api/rendimento/show-by-cpf/' + cpf)
        .then( res => {
            if ( res.status == 200 ) {
    
                message.success('Contribuinte encontrado!')
                setModel(res.data);
                return;
            }
        })
        .catch(err => {
            setModel({})
            message.error('Não foi encontrado contribuinte com este CPF.');
        })

    }

    const content = () => {
        if ( Object.keys(model).length !== 0 ) {

            if ( model.rendimentos.length > 0 ) {
                let descriptions = model.rendimentos.map((rendimento, index) => {
                    return (
                        <Panel header={`${rendimento.empresa.nome} - #${rendimento.empresa.cnpj}`} key={index}>
                            <Descriptions title="Informações do rendimento" bordered> 
                                <Descriptions.Item label="Contribuinte" span={3}>{`${model.nome} ${model.sobrenome}`}</Descriptions.Item>
                                <Descriptions.Item label="CPF" span={3}>{model.cpf}</Descriptions.Item>
                                <Descriptions.Item label="Empresa" span={3}>{rendimento.empresa.nome}</Descriptions.Item>
                                <Descriptions.Item label="CNṔJ" span={3}>{rendimento.empresa.cnpj}</Descriptions.Item>
                                <Descriptions.Item label="Valor total recebido" span={3}>{`R$ ${rendimento.valorTotal}`}</Descriptions.Item>
                                <Descriptions.Item label="INSS" span={3}>{`R$ ${rendimento.inss}`}</Descriptions.Item>
                                <Descriptions.Item label="IRRF Pago" span={3}>{`R$ ${rendimento.irrf}`}</Descriptions.Item>
                                <Descriptions.Item label="Valor 13 salário" span={3}>{`R$ ${rendimento.decimoTerceiro}`}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    )
                })
    
                return (
                    <Collapse>
                        {descriptions}
                    </Collapse>
                )
            } else {
                return (
                    <a>Não há rendimentos cadastrados para este contribuinte</a>
                )
            }
        }
    }

    return (
        <>
            <Search style={{marginBottom: 50}} value={search} onChange={ e =>setSearch(cpfMask(e.target.value))} placeholder="Entre com o CPF do contribuinte" onSearch={onSearch} enterButton />
            {content()}
        </>
    )
}