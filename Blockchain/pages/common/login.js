import React, { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import factory from  "../../ethereum/factory"
import styles from "../../css/rootIndex2.module.css"
import {Router} from "../../routes"
const BlackButton = () => {
    const [loading,setLoading] = useState(false); 
    
    
    const handleButtonClick = async(event) => {
        event.preventDefault();
        setLoading(true);
        const accounts = await web3.eth.getAccounts();

        try{
            const resAddress = '';
            const patientResult = await factory.methods.patientContracts(accounts[0]).call();
            const profResult = await factory.methods.medicalProf(accounts[0]).call();
            const doctorResult = await factory.methods.doctorsHospitals(accounts[0]).call();
            if(patientResult!=='0x0000000000000000000000000000000000000000'){
                console.log(patientResult);
                Router.replaceRoute(`/patients/${patientResult}/dash`);
            }
            else if(profResult!=='0x0000000000000000000000000000000000000000'){
                // console.log(patientResult);
                Router.replaceRoute(`/prof/${profResult}/dash`);

            }
            else if(doctorResult!=='0x0000000000000000000000000000000000000000'){
              Router.replaceRoute(`/hospital/${doctorResult}/dash`);

            }



            
      }
      catch(err){
        console.log(err)
      }
      setLoading(false);


    
  };

  return (
    <Layout>
    <Container textAlign="center">
      <Button
       
        size="huge"
        content="Click to Login"
        inverted
        onClick={handleButtonClick} 
        loading={loading}
        primary
      ></Button>
      <div class="ui red segment">
  <div class="ui sub header">please have metamask extension on your chrome browser installed and logged in to your specified account</div>
</div>
    </Container>
    </Layout>
  );
};

export default BlackButton;
