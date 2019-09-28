import React from "react";
import { useEffect, useState } from "react";
import "./View.css";
import Header from "../Common/Components/Header/Header";
import Footer from "../Common/Components/Footer/Footer";
import Graphs from "./Graph/Graphs";
import axios from "axios";

import Select from "react-select";

const timeSelectionOptions = [
  { value: "5", label: "5 Seconds" },
  { value: "30", label: "30 Seconds" },
  { value: "60", label: "1 minute" },
  { value: "120", label: "2 minutes" },
  { value: "300", label: "5 minutes" }
];
const temperatureKey = "temperature";
const pressureKey = "pressure";
const timestamp = "timestamp";
const unit = "unit";
const deviceType = "deviceType";
const deviceId = "deviceId";

function View() {
  let interval;
  const [timInterval, handleTimeInterval] = useState({
    value: "5",
    label: "5 Seconds"
  });
  const [temperatureData, setTemperatureData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  let [heartbeat, updateState] = useState(0);

  useEffect(() => {
    console.log("call happening");
    makeCall();
    interval = setInterval(handleHeartBeat, Number(timInterval.value) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timInterval, heartbeat]);

  const handleSelectChange = e => {
    clearInterval(interval);
    handleTimeInterval(e);
  };
  const handleHeartBeat = () => {
    console.log("call happening 111");
    updateState(heartbeat++);
  };
  const formatTemperatureData = fetchedData => {
    let data = { ...fetchedData },
      toBeupdatedData = JSON.parse(JSON.stringify(temperatureData)),
      eachObj = {},
      unitscale = 100;

    eachObj["x"] = data[timestamp];
    eachObj["y"] = parseInt(data[temperatureKey]);
    toBeupdatedData.push({ ...eachObj });

    return toBeupdatedData;
  };
  const formatPressureData = fetchedData => {
    let data = { ...fetchedData },
      toBeupdatedData = [...pressureData],
      eachObj = {},
      unitscale = 100;
    eachObj["x"] = data[timestamp];
    eachObj["y"] = parseInt(data[pressureKey]);
    toBeupdatedData.push({ ...eachObj });

    return toBeupdatedData;
  };

  const makeCall = async () => {
    try {
      const temperatureDataFetched = await axios.get(
        "/fixtures/pressureData.json"
      );
      const pressureDataFetched = await axios.get(
        "/fixtures/temperatureData.json"
      );

      setTemperatureData(
        JSON.parse(
          JSON.stringify(formatTemperatureData(temperatureDataFetched.data))
        )
      );
      setPressureData(
        JSON.parse(JSON.stringify(formatPressureData(pressureDataFetched.data)))
      );
    } catch (e) {}
  };

  return (
    <div className="view">
      <div className="header-view">
        <Header />
      </div>
      <div className="select-label">
        Please select to change the duration of view refresh :
      </div>
      <div className="select-view">
        <Select
          options={timeSelectionOptions}
          onChange={e => handleSelectChange(e)}
        />
      </div>
      <div>
        <Graphs
          temperatureData={temperatureData}
          pressureData={temperatureData}
        />
      </div>
      <div className="footer-view">
        <Footer />
      </div>
    </div>
  );
}

export default View;
