// // Charts

// // https://www.chartjs.org/docs/latest/samples/line/multi-axis.html

setupChart = (chartData) => {
    Chart.register(ChartDataLabels);

    var dates = Array.from(new Set(chartData.map(d => d.date))).reverse();
    // console.log(dates);

    var alex = constructDataForPlayer(chartData, "Alex Hedley");
    var will = constructDataForPlayer(chartData, "Will Wetzel");

    const datasets = [];
    var playerDataAlex = {
        label: "Alex",
        data: alex,
        borderColor: "red",
        fill: false
    };
    var playerDataWill = {
        label: "Will",
        data: will,
        borderColor: "blue",
        fill: false
    };
    datasets.push(playerDataAlex);
    datasets.push(playerDataWill);

    const options = {
        legend: { display: false }
    };

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

const constructDataForPlayer = (chartData, player) => {
    const gameDataForPlayer = chartData.map(g => g.players.filter(p => p.name === player)); //.map(g => g.position);
    // console.log(gameDataForPlayer);

    // const postions = gameDataForPlayer.flatMap(g => g.map(p => p.position));
    // console.log(postions);
    // return postions.reverse();

    const leaguePoints = gameDataForPlayer.flatMap(g => g.map(p => p.leaguePoints));
    // console.log(leaguePoints);
    return leaguePoints.reverse();
}
