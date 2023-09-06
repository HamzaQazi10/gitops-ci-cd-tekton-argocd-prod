import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import APIService from "./APIService";
import { useNavigate } from "react-router-dom";

// Defining useStyles constant for Styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  result: {
    background: "green",
    color: "white",
    margin: theme.spacing(1),
  },
}));

// Defining App coomponent for the front-end
function FrontPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), api: "", freq: "", duration: "" },
  ]);

  // Start Handler, When submitting, Backend will start calling the API,
  // and publish the data to the database
  const handleSubmit = (e) => {
    e.preventDefault();
    APIService.fetch_api(inputFields).then((response) =>
      setStatus(response.response)
    );
    setInputFields([{ id: uuidv4(), api: "", freq: "", duration: "" }]);
  };

  // Results Handler, It will display the results
  const handleSubmitResult = (e) => {
    e.preventDefault();
    navigate("/results");
  };

  // Handler for displaying the written text
  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  return (
    <Container style={{ margin: "0px" }}>
      <h1>3 Tier Application</h1>
      <h3>Description</h3>
      <p>
        As a DevOps Engineer, I am assigned to design a 3-tier web application
        using flask and AWS services. Application takes 3 parameters as input: a
        RESTful public API endpoint, the frequency at which the endpoint should
        be called, and duration for which to run the REST calls and then
        publishes the output to the database. This Presentation tier is designed
        in <strong>React JS</strong> that receives the parameters and passes to
        application tier.
      </p>
      <h2>Please Enter following parameters to proceed</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          // This div will take three input parameters from the user
          <div key={inputField.id}>
            <TextField
              required
              name="api"
              label="API End Point"
              variant="filled"
              value={inputField.api}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <TextField
              required
              name="freq"
              label="Frequency"
              variant="filled"
              value={inputField.freq}
              type="number"
              min="1"
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <TextField
              required
              name="duration"
              label="Duration (hr)"
              variant="filled"
              value={inputField.duration}
              type="number"
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
          </div>
        ))}
      </form>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Start
      </Button>

      <Button
        className={classes.result}
        variant="contained"
        color="inherit"
        type="submit"
        onClick={handleSubmitResult}
      >
        Results
      </Button>
      <h2>Status: {status}</h2>
    </Container>
  );
}

export default FrontPage;
