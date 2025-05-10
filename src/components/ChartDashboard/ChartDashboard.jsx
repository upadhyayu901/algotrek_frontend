import React from 'react';
import {useState, useEffect} from 'react';
import "../ChartDashboard/ChartDashboard.css";
import api from "../../utils/api";
import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer} from "recharts";
// import { useRef } from 'react';

const ChartDashboard = () => {
    const COLORS = ["#00C49F", "#FF8042"];
    const [topicData, setTopicData] = useState([]);
    const [statusData, setStatusData] = useState([]);

    // const chartSectionRef = useRef(null);

    useEffect(()=>{
        const fetchData = async () =>{
            const token = localStorage.getItem("algotrek_token");
            const res = await api.get("/questions/chart-data", {
                headers: {Authorization: `Bearer ${token}`},
            });

            setTopicData(res.data.topicData);
            setStatusData(res.data.statusData);
        }

        fetchData();
    }, [])
    console.log("topicData:", topicData );
    console.log("statusData:", statusData);
    
  return (
   <div className="chart-section" id="stats">
    <h3>Topic Breakdown</h3>
    <ResponsiveContainer width="100%" height={300}>
<BarChart data={topicData}>
<XAxis dataKey="topic"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="count" fill="#8884d8"/>
</BarChart>
    </ResponsiveContainer>

    <h3>Solved vs Unsolved</h3>
    <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={80} label>
                {statusData.map((entry, index) =>(
                    <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]}/>
                ))}
            </Pie>
            <Legend/>
        </PieChart>
    </ResponsiveContainer>
   </div>
  )
}

export default ChartDashboard;
