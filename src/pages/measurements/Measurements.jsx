import { base_url } from "@/api/baseUrl";
import VideoCart from "@/components/common/VideoCart";
import InputForm from "@/components/measurements/InputForm";
import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Measurements = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching email:", error);
        throw error;
      }
    };
    fetchData();
  }, [id]);

  // console.log("user:", user);

  return (
    <div>
      {/* <HeroVideo videoUrl={"https://www.youtube.com/watch?v=uUo9Bw5ytrI"} /> */}
      <HeroVideo
        videoUrl={
          user?.gender === "male"
            ? "https://youtu.be/iKJWC6dDjKQ?feature=shared"
            : "https://www.youtube.com/watch?v=uUo9Bw5ytrI"
        }
      />
      <Title tilte={"הזנת מדדים"} />
      <InputForm userId={id} gender={user?.gender} />
    </div>
  );
};

export default Measurements;
