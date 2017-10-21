// Цветовые константы
var _PointBorderColor = "rgba(255,255,255,0.9)";
var _BorderColor = ["rgba(255, 99, 132, 0.9)", "rgba(255, 159, 64, 0.9)", "rgba(255, 205, 86, 0.9)", "rgba(75, 192, 192, 0.9)", "rgba(54, 162, 235, 0.9)", "rgba(153, 102, 255, 0.9)", "rgba(201, 203, 207, 0.9)"];
var _BackgroundColor = ["rgba(255, 99, 132, 0.4)", "rgba(255, 159, 64, 0.4)", "rgba(255, 205, 86, 0.4)", "rgba(75, 192, 192, 0.4)", "rgba(54, 162, 235, 0.4)", "rgba(153, 102, 255, 0.4)", "rgba(201, 203, 207, 0.4)"];
var RadarPointer = 0;

// Константы  деления шкалы
var _labelflow = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [60, , , , , 5, , , , , 10, , , , , 15, , , , , 20, , , , , 25, , , , , 30, , , , , 35, , , , , 40, , , , , 45, , , , , 50, , , , , 55, , , , ,],
    [, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'],
    ['1:00', , , , '2:00', , , , '3:00', , , , '4:00', , , , '5:00', , , , '6:00', , , , '7:00', , , , '8:00', , , , '9:00', , , , '10:00', , , , '11:00', , , , '12:00', , , , '13:00', , , , '14:00', , , , '15:00', , , , '16:00', , , , '17:00', , , , '18:00', , , , '19:00', , , , '20:00', , , , '21:00', , , , '22:00', , , , '23:00', , , , '24:00'],
    ['1:00', , , '2:00', , , '3:00', , , '4:00', , , '5:00', , , '6:00', , , '7:00', , , '8:00', , , '9:00', , , '10:00', , , '11:00', , , '12:00', , , '13:00', , , '14:00', , , '15:00', , , '16:00', , , '17:00', , , '18:00', , , '19:00', , , '20:00', , , '21:00', , , '22:00', , , '23:00', , , '24:00'],
    ['1:00', , '2:00', , '3:00', , '4:00', , '5:00', , '6:00', , '7:00', , '8:00', , '9:00', , '10:00', , '11:00', , '12:00', , '13:00', , '14:00', , '15:00', , '16:00', , '17:00', , '18:00', , '19:00', , '20:00', , '21:00', , '22:00', , '23:00', , '24:00'],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ['I кв', 'II кв', 'III кв', 'IV кв'],
    ['2017', , '2018', , '2019', , '2020', , '2021'],
    ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']
];

//Базовые константы оформления представления 
var _BorderWidth = 3;
var _HoverBorderWidth = 4;
var _Fill = "origin";
var _PointRadius = 5;
var _PointHitRadius = 4;
var _PointHoverRadius = 6;
var _PointHoverBorderWidth = 1;
var _ShowLine = true;
var _SpanGaps = false;
var _CutoutPercentagePie = 0;
var _CutoutPercentageDoughnut = 0.5;
var _Rotation = 0.5 * Math.PI;
var _Circumference = 2 * Math.PI;

// Кронстанты параметров вывода
var _maxoptions = {
    animation: { duration: 800 },
    hover: { animationDuration: 1000 },
    responsiveAnimationDuration: 1000,
    legend: {
        display: true,
        labels: {
            fontSize: 18
        }
    },
    title: {
        display: true,
        text: 'Viz-a-technologies IoT Graphics',
        fontSize: 24
    },
    layout: {
        padding: {
            left: 80,
            right: 80,
            top: 0,
            bottom: 0
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
};

var _midoptions = {
    animation: { duration: 500 },
    hover: { animationDuration: 500 },
    responsiveAnimationDuration: 500,
    legend: {
        display: false,
    },
    title: {
        display: false,
        text: 'Viz-a-technologies IoT Graphics'
    },
    layout: {
        padding: {
            left: 80,
            right: 80,
            top: 0,
            bottom: 0
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

var _minoptions = {
    animation: { duration: 0 },
    hover: { animationDuration: 0 },
    responsiveAnimationDuration: 0,
    legend: {
        display: false,
    },
    title: {
        display: false,
        text: 'Viz-a-technologies IoT Graphics'
    },
    layout: {
        padding: {
            left: 80,
            right: 80,
            top: 0,
            bottom: 0
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

var LineChart;
var BarChart;
var HorizontalBarChart;
var RadarChart;
var PieChart;
var DoughnutChart;

function initializeCharts() {
        LineChart = CreateLineChart("lineChart", ["Device01", "Device04"], [4, 2], _labelflow[1], [[4, 4, 4, 4, 4, 4, 4, 4, 4, 4], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]);
        BarChart = CreateBarChart("barChart", ['Device05', 'Device06', 'Device07', 'Device08'], [2, 3, 4, 5], [0, 0, 0, 0], true);
        HorizontalBarChart = CreateBarChart("horizontalBarChart", ['Device06', 'Device08', 'Device05', 'Device07'], [2, 3, 4, 5], [3, 3, 3, 3], false);
        RadarChart = CreateRadarChart("radarChart", ["Device01", "Device04"], [2, 6], _labelflow[2], [[0], [0]]);
        PieChart = CreatePieChart("pieChart", ['Device05', 'Device06', 'Device07', 'Device08'], [1, 2, 3, 4], [2, 2, 2, 2], 'pie');
        DoughnutChart = CreatePieChart("doughnutChart", ['Device05', 'Device06', 'Device07', 'Device08'], [5, 6, 7, 1], [2, 2, 2, 2], 'doughnut');
}