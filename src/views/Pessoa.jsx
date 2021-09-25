import React from 'react'

import axios from 'axios';
import { Select, Form, Input, Button, message } from 'antd';

export default function Pessoa() {

    function handleSubmit(values) {
        axios.post('http://localhost:80/api/contribuinte', values)
        .then(res => {
            if ( res.status == 200 ) {
                message.success('Contribuinte cadastrado com sucesso!')
            }
        })
        .catch(err => {
            console.log('err', err.message)
            message.error('Não foi possível cadastrar o contribuinte')
        })
    }

    return (
        <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item label='Nome' name='nome' rules={[{
                required: true,
                message: 'Nome obrigatório'
            }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Sobrenome' name='sobrenome' rules={[{
                required: true,
                message: 'Nome obrigatório'
            }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Nome social' name='nome_social'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Cidade' name='cidade'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='CEP' name='cep' rules={[{required: true, message: 'Insira um CEP'}]}>
                <Input maxLength={10}></Input>
            </Form.Item>
            <Form.Item label='Complemento' name='complemento'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='E-mail' name='email'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='CPF' name='cpf' rules={[{
                required: true,
                message: 'CPF obrigatório'
            }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='RG' name='rg' rules={[{
                required: true,
                message: 'RG obrigatório'
            }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='Sexo' name='sexo' rules={[{required: true, message: 'Selecione um sexo'}]}>
                <Select placeholder='Selecione o sexo'>
                    <Select.Option value='m'>Masculino</Select.Option>
                    <Select.Option value='f'>Feminino</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type='submit' htmlType='submit'>Enviar</Button>
            </Form.Item>
        </Form>
    )
}