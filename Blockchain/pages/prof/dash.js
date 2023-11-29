import React from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import Prof from "../../ethereum/medical"
import { Menu,Input,Button } from "semantic-ui-react";
import { Link } from "../../routes";
import Patient from "../../ethereum/patient"
import factory from "../../ethereum/factory"
import { useState } from 'react';
import {Router} from "../../routes"
const ProfInfo = (props) => {

  const [inputValues, setInputValues] = useState({});
  const [allValues, setAllValues] = useState({});
  
  // const handleInputChange = (key, value) => {
  //   setInputValues((prevValues) => ({ ...prevValues, [key]: value }));
  // };

  const handleCardSubmit = (key,event) => {
    // You can use inputValues[cardKey] to access the input value for a specific card
    // console.log(`Submit clicked for Card ${cardKey}. Input value: ${inputValues[cardKey]}`);
    // event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    // const splitArray = key.split('_');
    // try{
    //   await Prof(address)

    // }
    event.preventDefault();
    Router.replaceRoute(`/prof/${key}/comments`);


  };

  const renderReports = ()=>{
    // const items = []
    // for(let i=0;i<props.patientReportList.length;i++){
    //   items.push({
    //     key:`${props.patientReportList[i][0]}_${props.patientReportList[i][2]}`,
    //     header: `${props.patientReportList[i][0]}`,
    //     description : props.patientReportList[i][1],
    //     fluid: true
    //   })
    // }
    // return <Card.Group items={items} />;
    return <div>
    {props.patientReportList.map((card) => (
      // <Card key={`${card[0]}_${card[2]}`}>
      //   <Card.Content>
      //     <Card.Header>{card[0]}</Card.Header>
      //     <Card.Description>{card[1]}</Card.Description>
      //     {/* <Input
      //       placeholder={`Input for Card ${card[0]}_${card[2]}`}
      //       onChange={(e, { value }) => handleInputChange(`${card[0]}_${card[2]}`, value)}
      //     /> */}
      //     <Button
      //       primary
      //       onClick={(event)=>handleCardSubmit(`${card[0]}_${card[2]}`,event)}
      //     >
      //       Submit
      //     </Button>
      //   </Card.Content>
      // </Card>
      <div className="ui teal segment" key={`${card[0]}_${card[2]}`}>
        <Header textAlign='center' as="h3"  style={{ color: 'teal' }}>{card[0]}</Header>
        <div>
        {card[1]}
        </div>
        <div className="center aligned">
        <Button 
            className="ui inverted secondary button"
            onClick={(event)=>handleCardSubmit(`${card[0]}_${card[2]}`,event)}
          >
            Add Comments
          </Button>
        </div>
        </div>
        
    ))}
  </div>
  }
    
  return (
    <Container>
      <Menu style={{ marginTop: "20px" }}>
      {/* <Menu.Item>CrowdCoin</Menu.Item> */}
      {/* styling of link tag and menu.item has conflicting styling */}
      {/* link tag is a generic wrapper component, it wraps its children with click event handler*/}
      <Link route="/">
        <a className="item">Medilator</a>
      </Link>

     
      <Menu.Menu position="right">
        <Link route="/patients/report">
          <a className="item">add docs</a>
        </Link>
        {/* <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link> */}
      </Menu.Menu>
      
    </Menu>
    <div className="ui red segment">
    <Header textAlign='center' as="h1"  style={{ color: 'red' }}>Med. Professional Information</Header>
      
      <div>
        <strong>Name: </strong> {props.profName}
      </div>
      <div>
        <strong>Age: </strong> {props.age}
      </div>
      <div>
        <strong>Gender: </strong> {props.gender}
      </div>
      <div>
        <strong>Hospital: </strong> {props.hospital}
      </div>
      <div>
        <strong>HospitalId: </strong> {props.hospitalId}
      </div>
      <div>
        <strong>Email: </strong> {props.email}
      </div>

    </div>
    
      {renderReports()}
      
    </Container>
  );
};

ProfInfo.getInitialProps = async (ctx) => {
    const { address } = ctx.query;
    console.log(address, "check",typeof(address));
    // return { address };
    
    const profDetails = await Prof(address).methods.getProfDetails().call()

    const patientsCount = await Prof(address).methods.patientCount().call();
    console.log(patientsCount,"count of patients")
    const patients = []
    for(let i=0;i<patientsCount;i++){
      patients.push(await Prof(address).methods.patientTrack(i).call());
    }
    console.log(patients,"list of patients")
    const patientReportList = [];

    for(let i=0;i<patients.length;i++){
      const reports = await Prof(address).methods.getPatientReports(patients[i]).call();
      console.log(reports,"reports of patient")
      for(let j=0;j<reports.length;j++){
        const temp = [];
        temp.push(patients[i]);
        let currDoc;
        try{
          let currPatientContract = await factory.methods.patientContracts(patients[i]).call();
          currDoc = await Patient(currPatientContract).methods.getPatientDocs(reports[j]).call();
        }catch(e){console.log(e);}
        temp.push(currDoc);
        temp.push(reports[j]);
        console.log(temp)
        console.log("check2")
        const comment = await Prof(address).methods.comments(patients[i],reports[j]).call()
        temp.push(comment)
        patientReportList.push(temp);

        

      }

    }
    console.log(patientReportList,"all reports patients")

    


    return {
        contractAddress : address,
        profName : profDetails[0],
        age : profDetails[1],
        gender : profDetails[2],
        hospital : profDetails[3],
        hospitalId : profDetails[4],
        email : profDetails[5],
        patientReportList : patientReportList
    }
  };

export default ProfInfo;
