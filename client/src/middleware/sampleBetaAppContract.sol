pragma solidity ^0.5.5;
pragma experimental ABIEncoderV2;

contract SampleBetaAppContract {

    struct File {
      string fileName;
      string fileHash;
    }
    
    // mapping of user address to their list of files
    mapping(address => File[]) public user_files;
    mapping (string => string) public file2Hashes; 
    File[] public allFiles;
    
    // Appending the new hash to user's list of hashes
    function setHash(string memory _fileName, string memory _fileHash) public returns (bool setBool){
        File memory file = File(_fileName, _fileHash);
        user_files[msg.sender].push(file);
        file2Hashes[_fileName] = _fileHash;
        allFiles.push(file);
        return true;
    }

    // Lists all the hashes of the user's files
    function getList() public view returns (File[] memory retFiles) {
        return user_files[msg.sender];
    }

    // Lists all the hashes of the files independent of the user
    function listAllHashes() public view returns (File[] memory retFiles) {
        return allFiles;
    }
    
    // Lists all the hashes of the files independent of the user
    function getHashByName(string memory _fileName) public view returns (string memory _fileHash) {
        return file2Hashes[_fileName];
    }
}
