import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    //api call logic
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        let modifiedResp = response?.data.map((obj) => {
          return {
            ...obj,
            status: "Open",
            description: obj.body,
          };
        });

        console.log("modified: ", modifiedResp);
        setData(modifiedResp.slice(0, 40));
      })
      .catch((err) => setError("Failed to fetch the posts"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, data };
};

export default useFetchPosts;
