// "use client";
// import dynamic from 'next/dynamic';
// import React from 'react';
// import 'flowbite';

// // Load ApexCharts dynamically to avoid issues with SSR (Server Side Rendering) in Next.js
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const ProductDataChart = ({ productData, categories }) => {
//   const chartOptions = {
//     chart: {
//       height: '100%',
//       maxWidth: '100%',
//       type: 'area',
//       fontFamily: 'Inter, sans-serif',
//       dropShadow: {
//         enabled: false,
//       },
//       toolbar: {
//         show: false,
//       },
//     },
//     tooltip: {
//       enabled: true,
//       x: {
//         show: false,
//       },
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         opacityFrom: 0.55,
//         opacityTo: 0,
//         shade: '#1C64F2',
//         gradientToColors: ['#1C64F2'],
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: 6,
//     },
//     grid: {
//       show: false,
//       strokeDashArray: 4,
//       padding: {
//         left: 2,
//         right: 2,
//         top: 0,
//       },
//     },
//     xaxis: {
//       categories: categories, // Pass categories dynamically
//       labels: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     yaxis: {
//       show: false,
//     },
//     series: [
//       {
//         name: 'Products Left',
//         data: productData, // Pass product data dynamically
//         color: '#1A56DB',
//       },
//     ],
//   };

//   return (
//     <div id="area-chart">
//       <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
//     </div>
//   );
// };

// export default ProductDataChart;
