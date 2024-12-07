import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { DataFilter, TaxiData } from "@/types";

const useData = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([] as TaxiData[]);

  const getData = (params: DataFilter) => {
    return new Promise((resolve, reject) => {
      setLoadingData(true);
      axios
        .get(import.meta.env.VITE_REACT_APP_API_URL + "/data", {
          headers: {
            "Content-Type": "application/json",
          },
          params: params
        })
        .then((res) => {
          setData(res.data);
          resolve(res.data);
          setLoadingData(false);
        })
        .catch((err) => {
          toast.error("Failed to fetch data");
          setLoadingData(false);
          reject(err);
        })
    });
  };

  return { loadingData, data, getData };
};

export default useData;