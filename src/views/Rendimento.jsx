import React, { useState } from 'react'

import { Select, Form, Input, Button, InputNumber, message } from 'antd'
import axios from 'axios'
import { mask } from '../helpers/mask'

export default function Rendimento() {

    const [companyError, setCompanyError] = useState('')
    const [companyStatus, setcompanyStatus] = useState('')
    const [formInstance] = Form.useForm();

    function handleSubmit(values) {
        let cpf = values.cpf.split('.').join('');
        cpf = cpf.split('-').join('')

        let cnpj = values.cnpj.split('.').join('');
        cnpj = cnpj.split('-').join('')
        cnpj = cnpj.split('/').join('')

        values.cnpj = cnpj;
        values.cpf = cpf;

        if ( companyStatus == 'success' ) {
            axios.post('http://localhost:80/api/rendimento', values)
            .then(res => {
                if ( res.status == 200 || res.status == 201) {
                    message.success('Rendimento cadastrado com sucesso!')
                }
            })
            .catch( err => {
                message.error('Rendimento não cadastrado')
            })
        } else {
            message.error('Nenhuma empresa foi encontrada com este CNPJ.')
        }
    }

    function checkCompany(cnpj) {
        setcompanyStatus('validating')

        let aux = cnpj.split('.').join('');
        aux = aux.split('-').join('')
        aux = aux.split('/').join('')

        axios.get('http://localhost/api/empresa/exists/' + aux)
        .then( res => {
            setcompanyStatus('success')
            setCompanyError('Empresa encontrada')
        })
        .catch( err => {
            setcompanyStatus('error')
            setCompanyError('Não foi encontrado empresa com esse cnpj')
        })
    }

    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit} form={formInstance} onValuesChange={(value, values) => {
                formInstance.setFieldsValue({
                    ...values,
                    cnpj: mask(values.cnpj),
                    cpf: mask(values.cpf)
                })
            }}>
                <Form.Item name='cnpj' hasFeedback label='CNPJ' required help={companyError} validateStatus={companyStatus} onChange={e=>{
                    if ( e.target.value.length == 18 ) {
                        checkCompany(e.target.value)
                    } else {
                        setCompanyError('')
                        setcompanyStatus('')
                    }
                }}>
                    <Input maxLength={18}></Input>
                </Form.Item>
                {/* <Form.Item label='Nome da empresa'>
                    <Input></Input>
                </Form.Item> */}
                <Form.Item rules={[{required: true, message: 'Insira seu CPF'}]} label='CPF' name='cpf'>
                    <Input maxLength={14}></Input>
                </Form.Item>
                <Form.Item label='Valor total recebido' name='valor_total'>
                    <InputNumber min={100}></InputNumber>
                </Form.Item>
                <Form.Item label='INSS' name='inss'>
                    <InputNumber></InputNumber>
                </Form.Item>
                <Form.Item label='IRRF Pago' name='irrf'>
                    <InputNumber></InputNumber>
                </Form.Item>
                <Form.Item label='Valor 13º salário' name='decimo_terceiro'>
                    <InputNumber></InputNumber>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Enviar</Button>
                </Form.Item>
            </Form>
        </>
    )
}