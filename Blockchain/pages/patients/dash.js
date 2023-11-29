import React from 'react';
import { Container, Header,Card, List } from 'semantic-ui-react';
import Patient from "../../ethereum/patient"
import Prof from "../../ethereum/medical"
import { Menu } from "semantic-ui-react";
import { Link } from "../../routes";
import web3 from '../../ethereum/web3';
const PatientInfo = (props) => {

  const renderReports = ()=>{
    const items = []
    for(let i=0;i<props.allDocs.length;i++){
      items.push({
        header: `report ${i}`,
        description : props.allDocs[i],
        fluid: true
      })
    }
    // return <Card.Group items={items} />;
    return <div className="ui link cards">
    {props.commentsList.map((card) => (
      // <Card key={card}>
      //   <Card.Content>
      //     <Card.Header>{`report ${card}`}</Card.Header>
      //     <Card.Description style={{ width: '100%' }}>{props.allDocs[card]}</Card.Description>
      //     {
      //       props.commentsTrack[card].map((comment)=>(
      //         <Card.Description >{comment}</Card.Description>
      //       ))
      //     }
      //     {/* <Card.Description style={{ width: '100%' }}>
      //     <List horizontal style={{ width: '100%' }}>
      //       <List.Item>{props.allDocs[card]}</List.Item>
      //       {props.commentsTrack[card].map((comment, index) => (
      //         <List.Item key={index}>{comment}</List.Item>
      //       ))}
      //     </List>
      //   </Card.Description> */}
      //     {/* <Input
      //       placeholder={`Input for Card ${card[0]}_${card[2]}`}
      //       onChange={(e, { value }) => handleInputChange(`${card[0]}_${card[2]}`, value)}
      //     /> */}
      //     {/* <Button
      //       primary
      //       onClick={(event)=>handleCardSubmit(`${card[0]}_${card[2]}`,event)}
      //     >
      //       Submit
      //     </Button> */}
      //   </Card.Content>
      // </Card>
      <div className="ui teal segment" key={card}>
        <Header textAlign='center' as="h3"  style={{ color: 'teal' }}>{`report ${card}`}</Header>
        <div>
        {props.allDocs[card]}
          </div>
          <Header textAlign='center' as="h3"  style={{ color: 'red' }}>Comments</Header>
          <div>

         <strong>
         {
            props.commentsTrack[card].map((comment)=>(
              <Card.Description >{comment}</Card.Description>
            ))
          }
         </strong>

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
        {/* <Link route={`/patients/${props.contractAddress}/report`}>
          <a className="item">add docs</a>
        </Link> */}
        {/* <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link> */}
      </Menu.Menu>
      
    </Menu>
    <div className="ui red segment">
    <Header textAlign='center' as="h1"  style={{ color: 'red' }}>Patient Information</Header>
    <div>
        <strong>Name:</strong> {props.patientName}
      </div>
      <div>
        <strong>Age:</strong> {props.age}
      </div>
      <div>
        <strong>Date of Birth:</strong> {props.birth}
      </div>
      <div>
        <strong>Gender:</strong> {props.gender}
      </div>
      <div>
        <strong>Phone Number:</strong> {props.phone}
      </div>
    </div>
      
      
    <div className="ui blue segment">
    <Header textAlign='center' as="h2"  style={{ color: 'teal' }}>Reports</Header>
      {renderReports()}
    </div>

      
      
    </Container>
  );
};

PatientInfo.getInitialProps = async (ctx) => {
    const { address } = ctx.query;
    console.log(address);
    // return { address };
    const accounts = await web3.eth.getAccounts();
    const patientDetails = await Patient(address).methods.getPatientDetails().call()
    const docsCount = await Patient(address).methods.docsCount().call();
  const allDocs = []
  for(let i=0;i<docsCount;i++) {
    const docNow = await Patient(address).methods.getPatientDocs(i).call();
    allDocs.push(docNow)
  }

  const commentsTrack = {}
  const commentsList = []
  const profCounts = await Patient(address).methods.profCount().call();
  console.log(profCounts,"profCounts")
  for(let i=0;i<profCounts;i++){
    const currProf = await Patient(address).methods.allMedProf(i).call();
    console.log(currProf,"currPorf")
    const reportList = await Prof(currProf).methods.getPatientReports(accounts[0]).call();
    console.log(reportList,"report List")
    for(let j=0;j<reportList.length;j++){
      commentsList.push(Number(reportList[j]));
      const currComment = await Prof(currProf).methods.comments(accounts[0],Number(reportList[j])).call();
      console.log(currComment,"curr comment")
      if (!commentsTrack.hasOwnProperty(Number(reportList[j]))){ {
        // If not, initialize it with an empty array
        commentsTrack[Number(reportList[j])] = [];
      }
      commentsTrack[Number(reportList[j])].push(currComment);
    }



  }
}
  console.log(commentsTrack,"comments Track")
  console.log(commentsList)

    return {
        allDocs : allDocs,
        contractAddress : address,
        patientName : patientDetails[0],
        age : patientDetails[1],
        birth : patientDetails[2],
        gender : patientDetails[3],
        phone : patientDetails[4],
        commentsTrack : commentsTrack,
        commentsList : commentsList
    }
  };

export default PatientInfo;
