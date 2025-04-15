const History = ({ history }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Your History</h2>
        <ul className="divide-y">
          {history && history.length > 0 ? (
            history.map((item, index) => (
              <li key={index} className="py-2">
                <p>{item.productName}</p>
                <p className="text-gray-500 text-sm">Viewed on: {item.date}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No history available.</p>
          )}
        </ul>
      </div>
    );
  };
  
  export default History;
  