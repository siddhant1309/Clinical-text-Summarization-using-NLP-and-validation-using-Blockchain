import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';

const doctorForm = () => {
  const [formData, setFormData] = useState('')
  const [loading,setLoading] = useState(false)
 

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    try{
        await factory.methods.createDoctor().send({
          from : accounts[0]
        })
    }
    catch(err){
      console.log(err)
    }
    setLoading(false)

    
  };

  return (
    <Layout>
    <div className="patient-form-container">
    <div className="form-box">
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>hospital Data</label>
        <Input
          placeholder="hospital data"
          value={formData}
          onChange={handleChange}
        />
      </Form.Field>
      
      <Button type="submit" className="submit-button" loading={loading}>Submit</Button>
    </Form>
    </div>
    </div>
    </Layout>
  );
};

export default doctorForm;
