import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';

const PatientForm = () => {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: '',
    hospital: '',
    hospitalId : '',
    email: ''
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    
        try {
            await factory.methods.createProf(formData.name,formData.age,formData.gender,formData.hospital,formData.hospitalId, formData.email).send({
                from: accounts[0],
              
            });
            
            
        }

      catch (error) {
        console.error('Error creating patient:', error);
      }
      setLoading(false);


    
  };

  return (
    <Layout>
    <div className="patient-form-container">
    <div className="form-box">
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Name</label>
        <Input
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Age</label>
        <Input
          placeholder="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Gender</label>
        <Input
          placeholder="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>hospital</label>
        <Input
          placeholder="hospital name"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Doc id</label>
        <Input
          placeholder="identitycode"
          name="hospitalId"
          value={formData.hospitalId}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <Input
          placeholder="email id"
          name="email"
          value={formData.email}
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

export default PatientForm;
