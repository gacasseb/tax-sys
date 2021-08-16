import React from 'react'

import { Select, Form, Input, Button } from 'antd'

export default function Pessoa() {

    function handleSubmit(values) {
    }

    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit}>
                <Form.Item label='Nome'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Sobrenome'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Nome social'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Endereço'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='E-mail'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Telefone'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='CPF'>
                    <Input></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='submit'>Enviar</Button>
                </Form.Item>
            </Form>
        </>
    )
}