import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoader = (flag) => setLoading(flag);

  return (
    <LoaderContext.Provider value={{ setLoader }}>
      {children}
      {loading && <GlobalLoader />}
    </LoaderContext.Provider>
  );
};

const GlobalLoader = () => (
  <div className="global-loader-overlay">
    <div className="global-loader-container">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{
          width: "4rem",
          height: "4rem",
          borderWidth: "0.4rem",
          fontWeight: "bold",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);
