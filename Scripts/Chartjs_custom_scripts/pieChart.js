function CreatePieChart(ControlID, DeviceNameSet, ColorIdSet, InitialDataSet, GraphType) {

    function getPieDatasetCanvas() {
        var _dataset = {
            data: InitialDataSet,
            backgroundColor: [],
            borderColor: [],
            borderWidth: _BorderWidth,
            hoverBackgroundColor: [],
            hoverBorderColor: [],
            hoverBorderWidth: _HoverBorderWidth,
            cutoutPercentage: (GraphType = "doughnut") ? _CutoutPercentageDoughnut : _CutoutPercentagePie,
            rotation: _Rotation,
           circumference: _Circumference,
        };
        for (i = 0; i < ColorIdSet.length; i++) {
            _dataset.backgroundColor.push(_BackgroundColor[ColorIdSet[i] - 1]);
            _dataset.borderColor.push(_BackgroundColor[ColorIdSet[i] - 1]);
            _dataset.hoverBackgroundColor.push(_BackgroundColor[ColorIdSet[i] - 1]);
            _dataset.hoverBorderColor.push(_BorderColor[ColorIdSet[i] - 1]);
        };
        return _dataset;
    }

    // Функция подготовки цветового шаблона линии
    function getPieGraphic() {
        var _data = {
            labels: [],
            datasets: []
        };

        _data.labels = DeviceNameSet;
        _data.datasets[0] = getPieDatasetCanvas();

        return _data;
    };

    var ctx = document.getElementById(ControlID);
    return new Chart(ctx, { type: GraphType, data: getPieGraphic() });
}

function AddPointToPie(_label, _value) {
    for (i = 0; i < PieChart.data.labels.length; i++) {
        if (PieChart.data.labels[i] == _label) {
            PieChart.data.datasets[0].data[i] = _value;
            PieChart.update();
        };
    };
}

function AddPointToDoughnut(_label, _value) {
    for (i = 0; i < DoughnutChart.data.labels.length; i++) {
        if (DoughnutChart.data.labels[i] == _label) {
            DoughnutChart.data.datasets[0].data[i] = _value;
            DoughnutChart.update();
        };
    };
}
