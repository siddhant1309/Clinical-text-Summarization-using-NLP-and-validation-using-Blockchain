import factory from "../ethereum/factory";
import { useEffect, useState } from "react";
import { Card, Button,Container } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import Campaign from "../ethereum/patient";
import web3 from "../ethereum/web3";
import { Router } from "../routes";


const campaignIndex = (props) => {


const [patientData, setPatientData] = useState("");
    // const [patientContract, setPatientContract] = useState("");
    // const [patientAddress, setPatientAddress] = useState("")
    // // const handleInputChange = (event) => {
    // //     setPatientData(event.target.value);
    // //   };

    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const accounts = await web3.eth.getAccounts();
    //     const sender = accounts[0];
    //     setPatientAddress(sender);
    //     try {
    //         // Get the accounts of the connected wallet
            
    //         await factory.methods.createPatient(patientData).send({
    //             from: accounts[0],
              
    //         });
    //     }

    //   catch (error) {
    //     console.error('Error creating patient:', error);
    //   }
      

      
    // }



    
    // return (
    //     <div>
    //   <input type="text" value={patientData} onChange={(event)=>setPatientData(event.target.value)} />
    //   <button onClick={handleSubmit}>Submit</button>
    //   <br></br>
     
      
    // </div>
    // );
    const handleBlueButtonClick = (event) => {
      event.preventDefault();
      console.log('Blue Button Clicked');
      Router.pushRoute("/");
      // Add your logic for the blue button here
    };
  
    const handleRedButtonClick = () => {
      console.log('Red Button Clicked');
      // Add your logic for the red button here
    };
  
    const handleGreenButtonClick = () => {
      console.log('Green Button Clicked');
      // Add your logic for the green button here
    };
  
    return (
      <Layout>
      <Container textAlign="center" className="centered-buttons-container">
      <Link route="/patients/register">
        <a>
        <Button color="blue" size="huge">
          Patient
        </Button>
        </a>
        </Link>
        <Link route="/hospital/register">
          <a>
        <Button color="red" size="huge" onClick={handleRedButtonClick}>
          Hospitals
        </Button>
        </a>
        </Link>
        <Link route="/prof/register">
          <a>
        <Button color="green" size="huge" onClick={handleGreenButtonClick}>
          
          Medical Prof.
        </Button>
        </a>
        </Link>
      </Container>
      </Layout>
    );
};

export default campaignIndex;
