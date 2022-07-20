import React, {useEffect, useState} from "react";
import {ResponsiveContainer, PieChart, Pie, Legend} from "recharts";
import {axiosCus} from "../commonFun";

const DashboardPieChart = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axiosCus
			.post("/count/allCatCounts")
			.then(response => setData(response.data))
			.catch(error => console.log(error));
	}, []);

	return (
		
       <ResponsiveContainer>
		 	<PieChart>
		 		<Pie
		 			data={data}
		 			dataKey="catCount"
		 			fill="#8884d8"
		 			label={({name, catCount}) => name + " " + catCount}
		 		/>
		 	</PieChart>
		 </ResponsiveContainer>
      
		
	);
};

export default DashboardPieChart;

// import React from 'react';
// import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// export default function DashboardPieChart(){

//     return (
//       <div style={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie dataKey="value" data={data} fill="#8884d8" label />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
// }
