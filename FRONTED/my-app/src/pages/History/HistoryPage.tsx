import React, { useState } from "react";
import "./HistoryPage.css";

interface HistoryItem {
  id: number;
  user_id: number;
  vin: string;
  results_count: number;
}

const HistoryPage: React.FC = () => {
  const user_id = localStorage.getItem("user_id");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const getHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/results/getResults?user_id=${user_id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData: HistoryItem[] = await response.json();
        console.log("Response:", responseData);
        setHistory(responseData);
        setIsButtonClicked(true); // Hide the button after fetching data
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {!isButtonClicked && <button onClick={getHistory}>Get History</button>}
      {history.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>VIN</th>
              <th>Results Count</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.vin}</td>
                <td>{item.results_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;
