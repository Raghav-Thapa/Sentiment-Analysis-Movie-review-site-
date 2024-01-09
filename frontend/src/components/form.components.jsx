import { Form, Col } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export const TextInput = ({value="", label="Name", labelIcon=null, type="text", name,changeEvent, required=true, placeholder="Enter your name...", error=null}) => {

  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">
          {labelIcon ? labelIcon : ""}
          {label}: 
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type={type}
            name={name}
            defaultValue={value}
            onChange={changeEvent}
            required={required}
            size="sm"
            placeholder={placeholder}
          />
          <span className="text-danger">{error}</span>
        </Col>
        
      </Form.Group>
    </>
  );
};


export const EmailInput = ({
        label="Email", 
        name,
        changeEvent, 
        required=true, 
        placeholder="Enter your email...",
        error=null
}) => {

    return (
      <>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">{label}: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              name={name}
              onChange={changeEvent}
              required={required}
              size="sm"
              placeholder={placeholder}
            />
            <span className="text-danger">{error}</span>
          </Col>
          
        </Form.Group>
      </>
    );
  };

  export const TextAreaInput = ({
    value="", 
    label="Name", 
    labelIcon=null, 
    changeEvent, 
    error=null
  }) => {

    console.log("value: ", value)

    return (
      <>
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">
            {labelIcon ? labelIcon : ""}
            {label}: 
          </Form.Label>
          
          <Col sm={9}>
                <CKEditor
                    editor={ ClassicEditor }
                    data={value}
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        changeEvent(data)
                    } }
                />

            
            <span className="text-danger">{error}</span>
          </Col>
          
        </Form.Group>
      </>
    );
  };