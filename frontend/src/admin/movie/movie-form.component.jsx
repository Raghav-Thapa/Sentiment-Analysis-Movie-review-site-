import { Form, Col, Button, Row } from "react-bootstrap";
import { TextAreaInput, TextInput } from "../../components/form.components";
import { FaPaperPlane, FaRedo, FaPlus,FaMinus } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";

import Select from 'react-select'
import { useSelector } from "react-redux";
import category from "../category";

const MovieForm = ({ submitAction, detail = null }) => {

  const [categories, setCategories] = useState();

  const loadCategories = useCallback(async() => {
    try {
      let allCats = await category.categorySvc.listAllCategorys();
      if(allCats) {
        let catOps = allCats.result.map((item) => {
          return {
            value: item._id, 
            label: item.name
          }
        })

        setCategories(catOps);
      }
    } catch(exception) {
      console.log(exception);
    }
  }, [])





  useEffect(() => {
    loadCategories()           
  }, [])

  // let loggedinUser = useSelector((root) => {
  //   return root.User.loggedInUser;
  // })

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    detail: Yup.string().required(),
    categories: Yup.array().of(Yup.object()).nullable().default(null),
    isFeatured: Yup.boolean().default(false),
    images: Yup.array(),
  });


  let formik = useFormik({
    initialValues: {
      name: "",
      detail: "",
      categories: null,
      isFeatured: false,
      status: "inactive",
      images: [],
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.categories = (values.categories.map((cat) => cat.value)).join(",");

      const formData = new FormData();
      console.log(values.images);
      
      if(values.images){
        values.images.map((image) => {
          if(typeof image === 'object'){
            formData.append('images', image, image.filename)
          }
        })
        delete values.images;
      }
      Object.keys(values).map((field) => {
        
        formData.append(field, values[field])
      })
      submitAction(formData);
    },
  });

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail
      });
    }
  }, [detail]);



  return (
    <>
    
      <Form onSubmit={formik.handleSubmit}>
        <TextInput
          label="Movie Name"
          name="name"
          value={formik.values?.name}
          changeEvent={formik.handleChange}
          placeholder="Enter name..."
          error={formik.errors?.name}
        />
        
        <TextAreaInput 
          label="Movie Detail"
          name="detail"
          value={formik.values?.detail}
          changeEvent={(data) => {
            if(data) {
              formik.setValues({
                ...formik.values, 
                detail: data
              })
            }
          }}
          placeholder="Enter Detail..."
          error={formik.errors?.detail}
        />
        
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Movie Type: </Form.Label>
          <Col sm={9}>
            <Select 
              options={categories} 
              name="categories"
              value={formik.values?.categories}
              onChange={(selcOpt) => {
                formik.setValues({
                  ...formik.values, 
                  categories: selcOpt
                })
              }}
              isMulti/>
            <span className="text-danger">{formik.errors?.categories}</span>
          </Col>
        </Form.Group>


        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Featured: </Form.Label>
          <Col sm={9}>
            <Form.Check 
                type="switch"
                id="custom-switch"
                label={formik.values.isFeatured ? "No" : "Yes"}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    isFeatured: e.target.checked
                  })
                }}
              />
            <span className="text-danger">{formik.errors?.isFeatured}</span>
          </Col>
        </Form.Group>


        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Status: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              value={formik.values?.status}
              required
              onChange={formik.handleChange}
              size="sm"
            >
              <option>-- Select Any one --</option>
              <option value={"active"}>Publish</option>
              <option value={"inactive"}>Un-Publish</option>
            </Form.Select>
            <span className="text-danger">{formik.errors?.status}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Images: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="file"
              size="sm"
              multiple
              name="image"
              onChange={(e) => {
                let files = Object.values(e.target.files);


                // [{}, {}, {}]
                let images = [];
                let errors = [];

                files.map((image) => {

                  let ext = image.name.split(".").pop();
                  if (
                    ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                      ext.toLowerCase()
                    )
                  ) {
                    images.push(image)
                  } else {
                    errors.push("File format not supported")
                  }
                })
                if(errors.length){
                  formik.setErrors({
                    ...formik.errors, 
                    images: errors.join("\n")
                  })
                } else {
                  
                  formik.setValues({
                    ...formik.values, 
                    images: images
                  })
                }

              }}
              accept="image/*"
            />
            <span className="text-danger">{formik.errors?.images}</span>
          </Col>
        </Form.Group>


        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button variant="success" className="me-3" type="submit" size="sm">
              <FaPaperPlane /> Submit
            </Button>
            <Button variant="danger" type="reset" size="sm">
              <FaRedo /> Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default MovieForm;