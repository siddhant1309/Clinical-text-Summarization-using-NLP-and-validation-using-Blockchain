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
    dob: '',
    phoneNumber: '',
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    
        try {
            // Get the accounts of the connected wallet
            
            await factory.methods.createPatient(formData.name,formData.age,formData.dob,formData.gender,formData.phoneNumber).send({
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
        <label>Date of Birth</label>
        <Input
          placeholder="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <Input
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Phone Number</label>
        <Input
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
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
