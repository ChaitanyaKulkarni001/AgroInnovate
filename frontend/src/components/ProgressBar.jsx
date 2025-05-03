const ProgressBar = ({ step, totalSteps }) => {
    const progress = (step / totalSteps) * 100; // Calculate the percentage
  
    return (
      <div className="mb-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="font-semibold text-sm">{`Step ${step} of ${totalSteps}`}</span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-between">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`, // Progress bar width
                height: "8px",
                backgroundColor: "#4caf50", // Green color for progress
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  