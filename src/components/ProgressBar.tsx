import { buildStyles, CircularProgressbar } from "react-circular-progressbar";


interface ProgressBarProps {
  score: number | undefined;
  total: number | null;
}

 export const ProgressBar: React.FC<ProgressBarProps> = ({ score, total }) => {
   // Default to 0 if score or total is null
   const actualScore = score ?? 0;
   const actualTotal = total ?? 1; // Avoid div ision by zero

   // Calculate percentage
   const percentage = (actualScore / actualTotal) * 100;

   return (
     <div style={{ width: "80px", height: "80px" }}>
       <CircularProgressbar
         value={percentage}
         text={`${actualScore}/${actualTotal}`}
         styles={buildStyles({
           pathColor: "#22c55e",
           textColor: "#333",
           trailColor: "#e0e0e0",
           strokeLinecap: "round",
         })}
       />
     </div>
   );
 };