function CreateLineChart(ControlId, DeviceNameSet, ColorIdSet, XLabelSet, DataSetCollection) {

    // Функция подготовки цветового шаблона линии
    function getLineDatasetCanvas(_datalabel, _colorstyle, _datavalue) {
        var _dataset = {
            label: _datalabel,
            borderColor: _BorderColor[_colorstyle-1],
            backgroundColor: _BackgroundColor[_colorstyle-1],
            borderWidth: _BorderWidth,
            fill: _Fill,
            pointBorderColor: _PointBorderColor,
            pointBackgroundColor: _BorderColor[_colorstyle - 1],
            pointRadius: _PointRadius,
            pointHitRadius: _PointHitRadius,
            pointHoverBorderColor: _PointBorderColor,
            pointHoverBackgroundColor: _BorderColor[_colorstyle - 1],
            pointHoverRadius: _PointHoverRadius,
            pointHoverBorderWidth: _PointHoverBorderWidth,
            showLine: _ShowLine,
            spanGaps: _SpanGaps,
            data: _datavalue
        };
        return _dataset;
    }

    function getLineGraphic() {
        var data = {
            labels: XLabelSet,
            datasets: []
        };
        for (i = 0; i < DeviceNameSet.length; i++) {
            data.datasets[i] = getLineDatasetCanvas(DeviceNameSet[i], ColorIdSet[i], DataSetCollection[i]);
        };
        return data;
    }

    var ctx = document.getElementById(ControlId);
    var LineChart = new Chart(ctx, { type: 'line', data: getLineGraphic(), options: _maxoptions });

    return LineChart;
}

function AddPointToLine(_device, _label, _value, _condition) {

    var _exists = false;
    for (i = 0; i < LineChart.data.datasets.length; i++) {
        if (LineChart.data.datasets[i].label == _device) _exists = true;
    }

    if (_exists) {
        LineChart.data.labels.push(_label);
        if (_condition) LineChart.data.labels.splice(0, 1);     // проверяем условие добавления данных (следует ли при этом удалять начальные значения)
        for (i = 0; i < LineChart.data.datasets.length; i++) {
            if (LineChart.data.datasets[i].label == _device) {
                LineChart.data.datasets[i].data.push(_value);
            } else {
                var _length = LineChart.data.datasets[i].data.length;
                var _lastvalue = LineChart.data.datasets[i].data[_length - 1];
                LineChart.data.datasets[i].data.push(_lastvalue);
            };
            if (_condition) LineChart.data.datasets[i].data.splice(0, 1);
        }
    }

    LineChart.update();
}