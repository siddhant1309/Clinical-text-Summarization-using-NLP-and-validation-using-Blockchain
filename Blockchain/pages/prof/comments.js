import React, { useState } from 'react';
import { Form, Input, Button, Container, Card, Header} from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';
import Patient from "../../ethereum/patient"
import {Router} from "../../routes";
import Prof from "../../ethereum/medical"

const LargeTextInput = (props) => {
    const [text, setText] = useState('');
    const [loading,setLoading] = useState(false);
    const [currComments,setCurrComments] = useState('')

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const splitArray = props.address.split('_');
    try{
        await Prof(props.profContract).methods.addComments(text,splitArray[0],Number(splitArray[1])).send({
            from : accounts[0]
        })
        
        


    


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
    <Header textAlign='center' as="h2"  style={{ color: 'red' }}>Comments</Header>
    
        <strong>{props.comment}</strong>
      </div>
      <div className="ui blue segment">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          {/* <label as="h2" style={{ color: 'blue' }}>Enter Comments</label> */}
          <Header textAlign='center' as="h3"  style={{ color: 'blue' }}>Enter Comments</Header>
          <Input
            fluid
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          Submit
        </Button>
      </Form>
      </div>
      
    </Container>
    </Layout>
  );
};

LargeTextInput.getInitialProps = async (ctx) => {
    const { address } = ctx.query;
    console.log(address);
    const accounts = await web3.eth.getAccounts();
    const splitArray = address.split('_');
    const profResult = await factory.methods.medicalProf(accounts[0]).call();
    const comment = await Prof(profResult).methods.comments(splitArray[0],Number(splitArray[1])).call()
  
    return {address : address,comment : comment,profContract : profResult}
}

export default LargeTextInput;
