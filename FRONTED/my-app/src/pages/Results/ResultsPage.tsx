import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResultsPageStyles.css";

interface Variable {
  VariableId: string;
  Variable: string;
  ValueId?: string;
  Value?: string;
}

interface Result {
  Variables: Variable[];
}

interface ApiResponse {
  Results: Result[];
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { data } = location.state as { data: ApiResponse };

  const [isLoading, setIsLoading] = useState(true);
  const [extractedData, setExtractedData] = useState<Variable[]>([]);

  useEffect(() => {
    const extractData = (data: ApiResponse): Variable[] | null => {
      try {
        if (
          data &&
          data.Results &&
          data.Results.length > 0 &&
          data.Results[0].Variables
        ) {
          return data.Results[0].Variables;
        } else {
          throw new Error("Data structure is incorrect or empty.");
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    if (data) {
      const extracted = extractData(data);
      if (extracted) {
        setExtractedData(extracted);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      console.error("No data received.");
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className="results-page">
      <div className="results-container">
        <h1>Car Details</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {extractedData.length > 0 ? (
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {extractedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Variable}</td>
                      <td>{item.Value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Data structure is incorrect or empty.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
