import React from 'react'

import { Select, Form, Input, Button, InputNumber } from 'antd'

export default function Rendimento() {

    function handleSubmit(values) {
    }

    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit}>
                <Form.Item label='CNPJ' required>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Nome da empresa'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Valor total recebido'>
                    <InputNumber min={100} formatter={value => `R$ ${value}`}></InputNumber>
                </Form.Item>
                <Form.Item label='INSS'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='IRRF Pago'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Valor 13º salário'>
                    <Input></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='submit'>Enviar</Button>
                </Form.Item>
            </Form>
        </>
    )
}