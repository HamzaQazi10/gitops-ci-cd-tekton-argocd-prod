import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import TableData from "./TableData";
const Results = () => {
  //Extract id present in the api call that requests this page
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState("1");

  // Results Handler, It will display the results
  const handleShowResult = (id) => {
    setTaskId(id);
  };
  useEffect(() => {
    //Calls /api/create using POST method and contains the user input in the body
    fetch("/results", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setTask(data.response));
  }, []);

  return (
    <div>
      This is resuls from backend
      <br />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Api Endpoint</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {task.map((data) => (
            <tr key={data[0]}>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
              <td>{data[2]}</td>
              <td>{data[3]}</td>
              <td>{data[4]}</td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={(id) => handleShowResult(data[0])}
                >
                  Show
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableData taskId={taskId} />
    </div>
  );
};

export default Results;
