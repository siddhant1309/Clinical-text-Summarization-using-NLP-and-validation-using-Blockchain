import React, { useState } from 'react';
import { Form, Input, Button, Container, Card, Header } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';
import Patient from "../../ethereum/patient"
import {Router} from "../../routes";
import Doctor from "../../ethereum/doctor"

const addPatient = (props)=>{

    const [text, setText] = useState('');
    const [loading,setLoading] = useState(false);

    const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    try{

        await Doctor(props.address).methods.recordPatient(text).send({
            from : accounts[0]
        })
      
      Router.replaceRoute(`/hospital/${props.address}/dash`);


    }
    catch(err){
        console.log(err);
    }
    setLoading(false);
    
  };


  

  return (
    <Layout>
    <Container textAlign="center">
    <div className="ui red segment">
      <Form onSubmit={handleSubmit}>

        <Form.Field>
        <Header textAlign='center' as="h3"  style={{ color: 'red' }}>Enter Clinical Data</Header>
          <Input
            fluid
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" loading={loading} className="ui inverted red button">
          Submit
        </Button>
      </Form>
      </div>
      
    </Container>
    </Layout>
  );
};

addPatient.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  console.log(address);
  
  return {address : address}
}






export default addPatient;