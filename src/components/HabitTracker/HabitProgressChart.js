import React, { useState} from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";


export default function HabitProgressChart({ habits }) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const data = habits.map(habit => ({
      name: habit.name,
      progress: habit.progress / habit.frequency
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    }
  
        return (
          <div>
              <PieChart width={700} height={700}>
                <Pie 
                  activeIndex={activeIndex}
                  data={data}
                  dataKey={"progress"}
                  outerRadius={250}
                  fill="green"
                  onMouseEnter={onPieEnter}
                  className="cursor-pointer outline-none">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
              </PieChart>

            
          </div>
        );
      };
      