import React, { useState } from 'react';
import { Form, Input, Button, Container, Card, Header } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3';
import Patient from "../../ethereum/patient"
import {Router} from "../../routes";
// import sendRequest from "../../components/sendResponse";

import axios from 'axios';

const LargeTextInput = (props) => {

  
 



  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  // const handleUpload = async () => {
  //   try {
  //     if (!file) {
  //       console.error('No file selected');
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append('image', file);

  //     const response = await fetch('http://localhost:3002/upload-image', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     const data = await response.json();
  //     console.log('API Response:', data);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedPng,setUploadedPng] = useState("");
  const [uploadedPngResult,setUploadedPngResult] = useState("");
  const [uploadedPngResult2,setUploadedPngResult2] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    let ocrResult = ""
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Replace the following URL with your actual backend endpoint
      const uploadEndpoint = 'http://localhost:3002/upload';

      fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
          console.log('File uploaded successfully:', data.resultMain);
          setUploadedPng("File uploaded successfully")
          setUploadedPngResult(data.resultMain);
          // console.log("result 101: " ,uploadedPngResult)
          ocrResult = data.resultMain
          const sentences = ocrResult.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
          const sentences2 = ocrResult.split(/[\s\n]+/);
          console.log(sentences2)
          // const sentences2 = ""
          // for(let i=0;i<sentences2.length;i++) {
            

          // }

          // let formattedParagraph = '';
          // sentences2.forEach((sentence, index) => {
          //       const sentenceWithNumber = `${index + 1}. ${sentence.trim()}`;
          //       formattedParagraph += `${sentenceWithNumber}\n`;
          // });
          
          // console.log("final result: ", formattedParagraph.trim());






          // const joinedString = sentences2.join(' ');

// let formattedParagraph = '';
// joinedString.split('.').forEach((sentence, index) => {
//   const trimmedSentence = sentence.trim();
//   if (trimmedSentence.length > 0) {
//     const sentenceWithNumber = `${index + 1}. ${trimmedSentence}\n`;
//     formattedParagraph += sentenceWithNumber;
//   }
// });
// console.log(formattedParagraph.trim());





let mergedSentence = ocrResult.split('. ');
for (let i = 0; i < mergedSentence.length; i++) {
  mergedSentence[i] = (i + 1) + '. ' + mergedSentence[i] + '.';
}

let modifiedParagraph = mergedSentence.join('');
setUploadedPngResult2(modifiedParagraph)
// let formattedText = '';

// const sentences3 = mergedSentence.split('. ');
// sentences3.forEach((sentence, index) => {
//   const numberedSentence = `${index + 1}.${sentence.trim()}`;
//   formattedText += `${numberedSentence}. `;
// });

// console.log(formattedText.trim());


// setUploadedPngResult2("1. OpenCV is the huge open-source library for the computer vision, machine learning, and image processing and now it plays a major role in real-time operation which is very important in today's systems.2. By using it, one can process images and videos to identify objects, faces, or even handwriting of a human.3. When it integrated with various libraries, such as Numpuy, python is capable of processing the OpenCV array structure for analysis.4. To Identify image pattern and its various features we use vector space and perform mathematical operations on these features")




          
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }

    
  };

  // const apiOcr = ()=>{
    

  // }















  const [text, setText] = useState('');
  const [loading,setLoading] = useState(false);
  const [jsonText,setJsonText] = useState('')
  const [patientAccount,setPatientAccount] = useState("")

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChangeAcc = (e)=>{
    setPatientAccount(e.target.value);
  }

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
      console.log(jsonResponse,"textrank test")
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
      const patientContract = await factory.methods.patientContracts(patientAccount).call();
    //   const doctorResult = await factory.methods.doctorsHospitals(accounts[0]).call();
      await Patient(patientContract).methods.insertPatientDocs(jsonResponse["summary"],0).send({
        from : accounts[0]
      })
      Router.replaceRoute(`/hospital/${props.address}/dash`);


    }
    catch(err){
        console.log(err);
    }
    setLoading(false);
    
  };


  

  return (
    <Layout>
    <Container textAlign="center">
    <div className="ui blue segment">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
        <Header textAlign='center' as="h3"  style={{ color: 'teal' }}>Enter Patient Clinical Text</Header>
          <Input
            
            placeholder="Type here..."
            value={text}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Header textAlign='center' as="h3"  style={{ color: 'teal' }}>Enter Patient id</Header>
          <Input
            
            placeholder="Type here..."
            value={patientAccount}
            onChange={handleChangeAcc}
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          Submit
        </Button>
      </Form>
      </div>

      <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    {uploadedPng}
    <br />
    {uploadedPngResult2}
      
  
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
