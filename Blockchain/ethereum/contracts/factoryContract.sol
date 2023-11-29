// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract factoryContract{

    mapping(address=>address) public patientContracts;
    mapping(address=>address) public doctorsHospitals;
    mapping(address=>address) public medicalProf;
    mapping(uint=>address) public profTracks;

    uint public profCount;
    //this value is also stored in database along with a curr value

    function createPatient(string memory _name, uint _age, string memory _birth, string memory _gender,string memory _phone) public{
        address newPatient = address(new patientContract(_name, _age, _birth, _gender,_phone,msg.sender,address(this)));
        patientContracts[msg.sender] = newPatient;


    }

    function createDoctor()public {
        address newDoctor = address(new doctorContract(msg.sender));
        doctorsHospitals[msg.sender] = newDoctor;
    }

    function createProf(string memory _name, uint _age, string memory _gender, string memory _hospital,string memory _hospitalId, string memory _email ) public {
        address newProf=  address(new medicalProfContract(address(this),msg.sender,_name,_age,_gender,_hospital,_hospitalId,_email));
        medicalProf[msg.sender] = newProf;
        profTracks[profCount] = msg.sender;
        profCount+=1;

    }

    function getMedicalProf(uint index) public view returns(address){
        return medicalProf[profTracks[index]];
    }

    function getPatientContract(address patient) public view returns(address){
        return patientContracts[patient];
    }

    function getDoctor(address doctor) public view returns(address){
        return doctorsHospitals[doctor];
    }

    function getMedicalProf(address prof) public view returns(address){
        return medicalProf[prof];
    }

    


}


contract patientContract{

    address public Factory;
    address public Patient;

    event addressProf(address profAddr);

    struct details{
        string patientName;
        uint age;
        string birth;
        string gender;
        string phone;
    }

    struct patientDoc{
        string doc;
        uint docTime;
    }
    details public patientDetails;
    mapping(address=> bool) public dataAccess;
    uint public docsCount;
    mapping(uint=>patientDoc) public retriveDocs;
    mapping(uint=>bool) public isValidated;
    mapping(uint=>address) public allMedProf;
    uint public profCount;
    mapping(address=>bool) public profTrack;



    constructor(string memory _name, uint _age, string memory _birth, string memory _gender,string memory _phone, address patient, address factory){
        Patient = patient;
        details memory newStructInstance = details({
            patientName: _name,
            age: _age,
            birth : _birth,
            gender : _gender,
            phone : _phone
            // Initialize other fields as needed
        });
        patientDetails = newStructInstance;

        Factory = factory;
        dataAccess[Patient] = true;
    }

    function getPatientDetails() public view returns(string memory,uint,string memory,string memory,string memory){
        return (
            patientDetails.patientName,
            patientDetails.age,
            patientDetails.birth,
            patientDetails.gender,
            patientDetails.phone

        );
    }

    function changePatientDetails(string memory _name, uint _age, string memory _birth, string memory _gender,string memory _phone) public {
        details memory newStructInstance = details({
            patientName: _name,
            age: _age,
            birth : _birth,
            gender : _gender,
            phone : _phone
            // Initialize other fields as needed
        });
        patientDetails = newStructInstance;
    }

    function insertPatientDocs(string memory data, uint curr) public {
        
        patientDoc memory newDoc = patientDoc({
            doc : data,
            docTime : block.timestamp
        });
        retriveDocs[docsCount] = newDoc;
        // docsCount+=1;
        //send for validation
        // increment curr value(in mongodb) after inserting each patient docs
        (bool success, bytes memory returnedData) = address(Factory).call(abi.encodeWithSignature("getMedicalProf(uint256)", curr));
        require(success,"some error1");
        address currProf = abi.decode(returnedData, (address));
        if(profTrack[currProf]==false){
            allMedProf[profCount] = currProf;
            profCount+=1;
            profTrack[currProf] = true;

        }
        emit addressProf(currProf);
        (bool success2, ) = address(currProf).call(abi.encodeWithSignature("addReports(uint256,address)", docsCount,Patient));
        docsCount+=1;
        require(success2,"some error2");
        

        





    }



    function provideAccess(address requester) public {
        dataAccess[requester] = true;
    }

    function getPatientDocs(uint index) public view returns(string memory){
        return retriveDocs[index].doc;
    }






    
    
}

contract medicalProfContract{
    address public Prof;
    address public Factory;
    uint public reportCount;
     
    struct details{
        string profName;
        uint age;
        string gender;
        string hospital;
        string hospitalId;
        string email;
    }

    details public profDetails;

    mapping(address => uint256[]) public patientReports;
    mapping(uint=>address) public patientTrack;
    uint public patientCount;
    mapping(address=>mapping(uint=>string)) public comments;

    constructor(address factory, address prof,string memory _name, uint _age, string memory _gender, string memory _hospital,string memory _hospitalId, string memory _email){
        Prof = prof;
        details memory newStructInstance = details({
            profName: _name,
            age: _age,
            gender : _gender,
            hospital : _hospital,
            hospitalId : _hospitalId,
            email : _email
            // Initialize other fields as needed
        });
        profDetails = newStructInstance;
        Factory = factory;
    }

    function getProfDetails() public view returns(string memory,uint,string memory,string memory,string memory,string memory){
        return (
            profDetails.profName,
            profDetails.age,
            profDetails.gender,
            profDetails.hospital,
            profDetails.hospitalId,
            profDetails.email

        );
    }

    function changeProfDetails(string memory _name, uint _age, string memory _gender, string memory _hospital,string memory _hospitalId, string memory _email) public{

        details memory newStructInstance = details({
            profName: _name,
            age: _age,
            gender : _gender,
            hospital : _hospital,
            hospitalId : _hospitalId,
            email : _email
            // Initialize other fields as needed
        });
        profDetails = newStructInstance;
    }

   

    function addComments(string memory _comments, address patient, uint record ) public {
        comments[patient][record] = _comments;
    }


    function addReports(uint report,address patient) public {
        
        if(patientReports[patient].length==0){
            patientTrack[patientCount] = patient;
            patientCount+=1;
        }
        patientReports[patient].push(report);
    }



    function getPatientReports(address patient) public view returns(uint[] memory){
        return patientReports[patient];
    }

}




contract doctorContract{

    address public Doctor;
    
    mapping(address=>bool) public patientList;
    uint public patientCount;
    mapping(uint=>address) public patientTrack;
    

    constructor(address doctor){
        Doctor = doctor;
        
    }

    // first doctor will save the patient hash
    function recordPatient(address patient) public {
        if(patientList[patient]==false){
            patientList[patient] = true;
            patientTrack[patientCount]  = patient;
            patientCount+=1;

        }

    }


  


    
    
}