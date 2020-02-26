import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import '../App.css';
class TableList extends React.Component {
    state = {
        props1: this.props
    }
    componentWillReceiveProps(newProps) {
        this.setState({ props1: newProps });
    }
    render() {
        const custom_primary = {
            backgroundColor: '#2185d0',
            color: '#fbfbfb',
            border: '1px solid #fbfbfb'
        }
        return (
            <Table celled >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell style={custom_primary}>
                            File Name
                                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan='2' style={custom_primary}>
                            File Hash
                                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" style={custom_primary}>
                            Verified (Auto verification happens when you view file)
                                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.props1.fileList.length === 0 ?
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell colSpan='2' textAlign="center">
                                No Data
                            </Table.Cell>
                            <Table.Cell />
                        </Table.Row> :
                        this.state.props1.fileList.map(aFile =>
                            <Table.Row key={aFile.fileName}>
                                <Table.Cell onClick={() => this.state.props1.readFile(aFile.Hash, aFile.Name)} className="hashHover">
                                    {aFile.Name}
                                </Table.Cell>
                                <Table.Cell colSpan='2'>
                                    <p>  {aFile.Hash}</p>
                                </Table.Cell>

                                <Table.Cell textAlign="center">
                                    {aFile.verfiledBoolean === 0 ?
                                        <h5 style={{ color: 'blue' }}>Unverified</h5> :
                                        aFile.verfiledBoolean === 1 ?
                                            <h5 style={{ color: 'green' }}>Passed</h5> :
                                            aFile.verfiledBoolean === -1 ?
                                                <h5 style={{ color: 'red' }}>Failed</h5> :
                                                <Icon loading name='spinner' size="large" />
                                    }
                                </Table.Cell>

                            </Table.Row>
                        )}


                </Table.Body>
            </Table>
        );
    }
}
export default TableList;
