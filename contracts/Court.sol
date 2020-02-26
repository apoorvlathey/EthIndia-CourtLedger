pragma solidity ^0.5.0;

contract Court {
    address public owner;
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }
    
    struct Lawyer {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;     //for each case
    }
    
    struct Judge {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    
    Lawyer[] public lawyers;
    Judge[] public judges;
    
    struct Case {
        address judge;
        address lawyer1;
        address lawyer2;
        string[] evidenceFileHash;
        string[] evidenceFileType;
        
        string party_1_name;
        string party_2_name;
        string details;
        string[] transcripts;
    }
    
    Case[] public cases;
    
    function registerLawyer(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public returns(uint lawyerId) {
        Lawyer memory l = Lawyer(_name, _phone, _email, _addr, _pubkey);
        lawyers.push(l);
        return (lawyers.length-1);
    }
    function registerJudge(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public returns(uint judgeId) {
        Judge memory j = Judge(_name, _phone, _email, _addr, _pubkey);
        judges.push(j);
        return (judges.length-1);
    }
    
    function newCase(uint _judgeId, uint _lawyer1Id, uint _lawyer2Id, string memory _party_1_name, string memory _party_2_name, string memory _details) public onlyOwner returns(uint caseId) {
        string[] memory empty;
        Case memory tcase = Case(judges[_judgeId].addr, lawyers[_lawyer1Id].addr, lawyers[_lawyer2Id].addr, empty, empty, _party_1_name, _party_2_name, _details, empty);
        cases.push(tcase);
        
        return (cases.length-1);
    }
    
    // Evidence
    function uploadEvidence(uint _caseId, string memory _fileHash, string memory _fileType) onlyOwner public {
        // to compare String without importing StringUtils Contract:
        require(keccak256(bytes(_fileHash)) != keccak256(bytes("")) && keccak256(bytes(_fileType)) != keccak256(bytes("")));    //here checking string Not Null
        cases[_caseId].evidenceFileHash.push(_fileHash);
        cases[_caseId].evidenceFileType.push(_fileType);
    }
    
    function getEvidenceCount(uint _caseId) public view returns(uint) {
        return cases[_caseId].evidenceFileHash.length;
    }
    function getEvidence(uint _caseId, uint _evidenceNo) public view returns(string memory FileHash, string memory FileType) {
        return (cases[_caseId].evidenceFileHash[_evidenceNo], cases[_caseId].evidenceFileType[_evidenceNo]);
    }
    
    //Transcript
    function uploadTranscript(uint _caseId, string memory _transcript) onlyOwner public {
        cases[_caseId].transcripts.push(_transcript);
    }
    function getTranscriptsCount(uint _caseId) public view returns(uint) {
        return cases[_caseId].transcripts.length;
    }
    function getTranscript(uint _caseId, uint _transcriptNo) public view returns(string memory) {
        return cases[_caseId].transcripts[_transcriptNo];
    }
    
    //EncryptedKeys
    function addEncryptedKey(bool _isLawyer, uint _ljId, uint _caseId, string memory _key) public onlyOwner {
        if(_isLawyer) {
            lawyers[_ljId].encryptedKeys[_caseId] = _key;
        } else {
            judges[_ljId].encryptedKeys[_caseId] = _key;
        }
    }
    function getEncryptedKey(bool _isLawyer, uint _ljId, uint _caseId) public view returns(string memory) {
        if(_isLawyer) {
            return lawyers[_ljId].encryptedKeys[_caseId];
        } else {
            return judges[_ljId].encryptedKeys[_caseId];
        }
    }
    
    constructor() public {
        owner = msg.sender;
    }
}