import React, { useState } from 'react';
import { Form, Input, Button, Container, Card } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';
import Patient from "../../ethereum/patient"
import {Router} from "../../routes";
// import sendRequest from "../../components/sendResponse";

const LargeTextInput = (props) => {
  const [text, setText] = useState('');
  const [loading,setLoading] = useState(false);
  const [jsonText,setJsonText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();

    //SUMMARIZER
//     const apiUrl = 'http://021a-34-121-152-28.ngrok-free.app';
const requestData2 = {"text": "1. The left ventricular cavity size and wall thickness appear normal. The wall motion and left ventricular systolic function appears hyperdynamic with estimated ejection fraction of 70% to 75%. There is near-cavity obliteration seen. There also appears to be increased left ventricular outflow tract gradient at the mid cavity level consistent with hyperdynamic left ventricular systolic function. There is abnormal left ventricular relaxation pattern seen as well as elevated left atrial pressures seen by Doppler examination.\n2. The left atrium appears mildly dilated.\n3. The right atrium and right ventricle appear normal.\n4. The aortic root appears normal.\n5. The aortic valve appears calcified with mild aortic valve stenosis, calculated aortic valve area is 1.3 cm square with a maximum instantaneous gradient of 34 and a mean gradient of 19 mm.\n6. There is mitral annular calcification extending to leaflets and supportive structures with thickening of mitral valve leaflets with mild mitral regurgitation.\n7. The tricuspid valve appears normal with trace tricuspid regurgitation with moderate pulmonary artery hypertension. Estimated pulmonary artery systolic pressure is 49 mmHg. Estimated right atrial pressure of 10 mmHg.\n8. The pulmonary valve appears normal with trace pulmonary insufficiency.\n9. There is no pericardial effusion or intracardiac mass seen.\n10. There is a color Doppler suggestive of a patent foramen ovale with lipomatous hypertrophy of the interatrial septum.\n11. The study was somewhat technically limited and hence subtle abnormalities could be missed from the study."}


  const someText = text.replace(/(\.)(\d+)/g, '$1\n$2');//alpha 1
    
    // const someText = text.replace(/(\r\n|\n|\r)/gm,"");
    // const someText = text.replace(/(\d+)/g, '\n$1')
    // setText(someText)
    const requestData = {
      "text": ""}
    requestData["text"] = someText
    
    

    console.log( "check request data",requestData)
    console.log( "check request data2",requestData2)
    // console.log( "check request some text",someText)
    


   
    const apiUrl = 'http://localhost:3001/'; // Update with your server URL

   const jsonResponse = ""

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestData }),
      });

      if (response.ok) {
        jsonResponse = await response.json();
        // setResponseData(jsonResponse);
      console.log(jsonResponse["summary"],typeof(jsonResponse["summary"]))
      // setJsonText("check 12343567");
      } else {
        throw new Error(`HTTP error! Status222: ${response.status}`);
      }
    } catch (error) {
      console.error('Error222:', error);
    }


    //////////////////////////////////////////////////////////////////
     try{
      console.log(jsonText,"jsonText");
      await Patient(props.address).methods.insertPatientDocs(jsonResponse["summary"],0).send({
        from : accounts[0]
      })
      Router.replaceRoute(`/patients/${props.address}/dash`);


    }
    catch(err){
        console.log(err);
    }
    setLoading(false);
    
  };


  

  return (
    <Layout>
    <Container textAlign="center">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Enter Clinical Data</label>
          <Input
            
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          Submit
        </Button>
      </Form>
      
    </Container>
    </Layout>
  );
};

LargeTextInput.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  console.log(address);
  
  return {address : address}
}

export default LargeTextInput;
