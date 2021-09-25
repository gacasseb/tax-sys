import React, { useState } from 'react';

import axios from 'axios';
import { Select, Form, Input, Button, Spin, message } from 'antd';
import { mask } from '../helpers/mask';

export default function Empresa() {

    const [loading, setLoading] = useState(false);
    const [formInstance] = Form.useForm();

    function handleSubmit(values) {
        setLoading(true);
        axios.post('http://localhost:80/api/empresa', values)
        .then((res, err) => {
            if ( res.status == 201 ) {
                message.success('Empresa cadastrada com sucesso');
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            message.error('Não foi possível cadastrar a empresa');
        })
    }

    function form() {
        return (
            <Form layout='vertical' onFinish={handleSubmit} form={formInstance} onValuesChange={(value, values) => {
                formInstance.setFieldsValue({
                    ...values,
                    cnpj: mask(values.cnpj)
                })
            }}>
                <Form.Item label='Nome' name='nome' rules={[{
                    required: true,
                    message: 'Nome da empresa obrigatório'
                }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='CNPJ' name='cnpj' rules={[{
                    required: true,
                    message: 'CNPJ obrigatório'
                }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Razão social' name='razao_social'>
                    <Input onPressEnter={() => {console.log('entrooou!')}}></Input>
                </Form.Item>
                <Form.Item label='Nome social' name='nome_social'>
                    <Input></Input>
                </Form.Item>
                {/* <Form.Item label='Endereço'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Telefone'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='Celular'>
                    <Input></Input>
                </Form.Item>
                <Form.Item label='E-mail'>
                    <Input></Input>
                </Form.Item> */}
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Enviar</Button>
                </Form.Item>
            </Form>
        );
    }

    if ( loading ) {
        return (
            <>
                <Spin>
                    {form()}
                </Spin>
            </>
        )
    }

    return (
        <>
            {form()}
        </>
    )
}