import React from 'react';
import { Container, Header,Card } from 'semantic-ui-react';
import Patient from "../../ethereum/patient"
import Doctor from "../../ethereum/doctor"
import factory from "../../ethereum/factory"
import { Menu } from "semantic-ui-react";
import { Link } from "../../routes";
import web3 from '../../ethereum/web3';

const doctorInfo = (props)=>{



    const renderReports = ()=>{
        
        return <div>
         {/* <Card.Group>
      {props.patientReportList.map(([address, stringArray, numberArray]) => (
        <Card key={address}>
          <Card.Content>
            <Card.Header>{address}</Card.Header>
            {stringArray.map((str, index) => (
              <div key={index}>
                <h4>Report {index + 1}</h4>
                <Card.Description>{str}</Card.Description>
              </div>
            ))}
          </Card.Content>
        </Card>
      ))}
    </Card.Group> */}
    {props.patientReportList.map(([address, stringArray, numberArray]) => (
      <div className="ui teal segment" key={address}>
        <Header textAlign='center' as="h3"  style={{ color: 'teal' }}>Patient id : {address}</Header>
        {stringArray.map((str, index) => (
              <div key={index}>
                <h4>Report {index}</h4>
                <div>{str}</div>
                <br></br>
              </div>
            ))}
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

     
      <Menu.Menu >
        <Link route={`/hospital/${props.address}/addPatient`}>
          <a className="item">add Patient</a>
        </Link>
        
      </Menu.Menu>
      <Menu.Menu >
        <Link route={`/hospital/${props.address}/addReport`}>
          <a className="item">add Reports</a>
        </Link>
        
      </Menu.Menu>
      <Menu.Menu position="right">
        <Link route="/login">
          <a className="item">login</a>
        </Link>
        {/* <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link> */}
      </Menu.Menu>
      
    </Menu>
    <div className="ui green segment">
    <Header textAlign='center' as="h1"  style={{ color: 'green' }}>Doctor's Dashboard </Header>
      
      <div>
        <strong>Name:</strong> {props.address}
      </div>

    </div>
    <div className="ui teal segment">
    {renderReports()}
    </div>
      
    </Container>
    )


}


doctorInfo.getInitialProps = async(ctx)=>{
    const { address } = ctx.query;
    console.log(address);
    const countPatients = await Doctor(address).methods.patientCount().call();
    const patientsList = []
    for(let i=0; i<countPatients; i++){
        patientsList.push(await Doctor(address).methods.patientTrack(i).call());
    }
    const patientReportList = [];
    for(let i=0;i<patientsList.length;i++){
        const temp = [];
        temp.push(patientsList[i])
        const currPatientContract = await factory.methods.patientContracts(patientsList[i]).call();
        const docsCount = await Patient(currPatientContract).methods.docsCount().call();
        const temp2 = []
        const temp3 = []
        for(let j=0;j<docsCount;j++){
            const docNow = await Patient(currPatientContract).methods.getPatientDocs(j).call();
            temp2.push(docNow)
            temp3.push(j)
        }
        temp.push(temp2)
        temp.push(temp3)
        patientReportList.push(temp);
    }
    console.log(patientReportList)
    return {
        address : address,
        patientReportList : patientReportList
    }
}

export default doctorInfo;