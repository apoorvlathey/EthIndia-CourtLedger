import React from 'react';
import { Image,Modal} from 'semantic-ui-react';
import FileSaver from 'file-saver';


const showModal = (props) => {
    return (
        <Modal open={props.modalOpen} size="small">
            <Modal.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p> {props.fileName}</p>
                    <p style={{cursor:'pointer'}} onClick={props.modalClose}>&#10005;</p>
                </div>

            </Modal.Header>
            <Modal.Content image >
                {props.fileType === "image/png" || props.fileType === "image/jpeg" || props.fileType === "image/gif" ?

                    < Image wrapped size='medium' src={props.responseData} style={{ marginLeft: '25%' }} />
                    : props.fileType === "text/plain" || props.fileType === "text/html" || props.fileType === "text/js" || props.fileType === "text/csv"?
                        <p>{props.responseData}</p>
                    :
                    <div>
                        <h3 style={{float:'left'}}>No preview available. 
                            <span style={{color:'#2185d0',marginLeft:'15px',cursor:'pointer'}} onClick={()=>FileSaver.saveAs(props.responseData,props.fileName)}>Download</span>
                        </h3>
                    </div>
                }
            </Modal.Content>
        </Modal>
    );
}
export default showModal;