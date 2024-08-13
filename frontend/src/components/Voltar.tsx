import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Voltar: React.FC = () => {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    } else {
      console.error("Router not mounted");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center text-blue-600 font-inter text-base uppercase mt-6 px-2 rounded-full"
    >
      <ArrowBackIcon sx={{ color: "blue" }} />
      <span className="ml-2">Voltar</span>
    </button>
  );
};

export default Voltar;
