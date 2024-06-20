import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let orderDate = [];
        let orderTotal = [];

        axios
            .get('/api') // Replace with your API endpoint
            .then(res => {
                if (res.data.results && res.data.results.length > 0) {
                    for (const dataObj of res.data.results) {
                        orderDate.push(dataObj.order_date);
                        orderTotal.push(dataObj.total);
                    }
                    setChartData({
                        labels: orderDate,
                        datasets: orderTotal.length > 0 ? [
                            {
                                label: 'Orders',
                                data: orderTotal,
                                backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                                borderWidth: 4
                            }
                        ] : []
                    });
                } else {
                    console.log('No data available');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <div className="App">
            <h1>Dashboard</h1>
            <div>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "Orders Over the Last Week", display: true },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
