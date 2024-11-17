
import { Pie } from "react-chartjs-2";


export default function HabitProgressChart({ habits }) {
    
        const data = {
          labels: habits.map(habit => habit.name),
          datasets: [
            {
              data: habits.map(habit => habit.progress),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        };
        const options = {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    enabled: true,
                },
            },
        };
        return (
          <div className="w-full max-w-md mx-auto mt-4 p-4">
            <Pie data={data} options={options}/>
          </div>
        );
      };
      