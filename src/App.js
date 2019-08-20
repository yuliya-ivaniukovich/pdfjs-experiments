import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {Document, Page} from 'react-pdf';
import './App.css';

class App extends Component {
    state = {
        pdfFile: null,
        documentProxy: null
    };

    render() {
        return (
            <div className="app">
                {this.state.pdfFile ? this.renderPdf() : this.renderDropzone()}
            </div>
        );
    }

    renderDropzone = () => (
        <Dropzone onDrop={this.handleDrop}>
            {({getRootProps, getInputProps}) => (
                <div className="drop-zone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span>Drop PDF file here</span>
                </div>
            )}
        </Dropzone>
    );

    renderPdf = () => (
        <Document file={this.state.pdfFile} onLoadSuccess={this.handleDocumentLoadSuccess}>
            <Page pageNumber={1} />
        </Document>
    );

    handleDrop = files => {
        this.setState({pdfFile: files[0]});
    };

    handleDocumentLoadSuccess = documentProxy => {
        documentProxy.loadingTask.promise.then((documentProxy) => {
            documentProxy.getPage(1).then(page => {
                console.log(page);
                page.getOperatorList().then(list => {
                    console.log(list);
                });
            });
        });
        this.setState({documentProxy});
    };
}

export default App;
