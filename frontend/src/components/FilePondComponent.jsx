// https://github.com/pqina/react-filepond
// https://pqina.nl/filepond/docs/getting-started/installation/react/#react-component-implementation
// https://pqina.nl/filepond/docs/api/instance/methods/
// https://github.com/pqina/filepond/issues/24 manual upload file

// npm install react-filepond filepond --save
import React, { useState, useEffect } from "react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import useConfig from '../hooks/useConfig';

// Register the plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
);

// Our app
export function FilePondComponent() {

    const { apiUrl } = useConfig();

    const [files, setFiles] = useState([]);
    // console.log("files", files);
    let pond = null;

    const onFilesChanged = (files) =>{
        console.log("asdsadsad")
    }

    const onSubmit = () => {
        const formData = new FormData();
        // files
        //   .map((item) => item.file)
        //   .forEach((file) => formData.append("my-file", file));
        // console.log(formData);
        console.log("pond", pond);

        if (pond) {
            // pond.setOptions({
            //   server: {
            //     url: "https://httpbin.org/post",
            //     timeout: 7000
            //     // process: {
            //     //   url: "./process",
            //     //   method: "POST",
            //     //   headers: {
            //     //     "x-customheader": "Hello World"
            //     //   },
            //     //   withCredentials: false,
            //     //   onload: (response) => response.key,
            //     //   onerror: (response) => response.data,
            //     //   ondata: (formData) => {
            //     //     formData.append("Hello", "World");
            //     //     return formData;
            //     //   }
            //     // },
            //     // revert: "./revert",
            //     // restore: "./restore/",
            //     // load: "./load/",
            //     // fetch: "./fetch/"
            //   }
            // });

            const files = pond.getFiles();
            files.forEach((file) => {
            console.log("each file", file, file.getFileEncodeBase64String());
            });

            pond
            .processFiles(files)
            .then((res) => console.log(res))
            .catch((error) => console.log("err", error));
        }
    };

  return (
    <div className="App">
      <FilePond
        files={files}
        ref={(ref) => {
          pond = ref;
        }}
        required
        acceptedFileTypes={["application/pdf"]}
        fileValidateTypeDetectType={(source, type) =>
          // Note: we need this here to activate the file type validations and filtering
          new Promise((resolve, reject) => {
            // Do custom type detection here and return with promise
            resolve(type);
          })
        }
        allowFileEncode
        onupdatefiles={(files) => onFilesChanged(files)}
        instantUpload={false}
        allowMultiple={false}
        maxFiles={1}
        server="https://httpbin.org/post"
        name="files"
        labelIdle={apiUrl}
      />
    </div>
  );
}