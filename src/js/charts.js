// Charts

// https://www.chartjs.org/docs/latest/samples/line/multi-axis.html

// Position per game
getChartData = (data) => {
    const tempData = [
        { 
            "date": "2025-07-02",
            "player": "Alex Hedley",
            "leaguePosition": 41,
        },
        { 
            "date": "2025-07-02",
            "player": "Will Wetzel",
            "leaguePosition": 26,
        },
        { 
            "date": "2025-07-03",
            "player": "Alex Hedley",
            "leaguePosition": 39,
        },
        { 
            "date": "2025-07-03",
            "player": "Will Wetzel",
            "leaguePosition": 24,
        }
    ]
    return tempData;
};

setupChart = (chartData) => {
    Chart.register(ChartDataLabels);

    const options = {
        responsive: true,
        interaction: {
        mode: 'index',
        intersect: false,
        },
        stacked: false,
        plugins: {
            datalabels: {
                color: "#36A2EB",
            },
            title: {
                display: true,
                text: 'Position'
            }
        },
        scales: {
            "Alex Hedley": {
                type: 'linear',
                display: true,
                position: 'left',
            },
            "Will Wetzel": {
                type: 'linear',
                display: true,
                position: 'right',

                // grid line settings
                grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        }
    };

    const datasets = buildDataSets(chartData);
    console.log(datasets);

    var dates = Array.from(new Set(chartData.map(d => d.date)));
    console.log(dates);

    const config = {
        type: "line",
        data: {
            labels: dates,
            datasets: datasets
        },
        options,
    };

    let ctx = $("#chartPosition");

    let lineGraph = new Chart(ctx, config);
};

buildDataSets = (chartData) => {
    var datasets = [];
    var players = new Set(chartData.map(d => d.player));
    console.log(players);

    players.forEach((p, i) => {
        var positions = chartData.filter((game) => game.player == p).map(g => g.leaguePosition);
        console.log(positions);

        var dataset = {
            label: p,
            data: positions,
            borderColor: randomColour(),
            backgroundColor: randomColour(),
            yAxisID: i
        }
        datasets.push(dataset);
    });

    return datasets;

    // Template
    // {
    //     label:
    //     data:
    //     borderColor:
    //     backgroundColor:
    //     yAxisID: 
    // }
}

function randomColour() {
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    var randomColour = randomRGB();
    console.log(randomColour);
    return randomColour;
}

// ----- ----- ----- ----- -----