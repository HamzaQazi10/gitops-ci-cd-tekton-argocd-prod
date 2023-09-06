import React, { useState, useEffect } from "react";
function TableData(taskId) {
  const [task, setTask] = useState([]);
  useEffect(() => {
    //Calls /api/create using POST method and contains the user input in the body
    fetch("/results/id", {
      method: "POST",
      body: JSON.stringify(taskId),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setTask(data.response));
  }, [taskId]);

  return (
    <div>
      <h1>Table Data:</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {task.map((data) => (
            <tr key={data[0]}>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
              <td>{data[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
