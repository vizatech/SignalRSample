function CreateRadarChart(ControlId, DeviceNameSet, ColorIdSet, RLabelSet, DataSetCollection) {

    function getRadarDatasetCanvas(_datalabel, _colorstyle, _datavalue) {
        var _dataset = {
            label: _datalabel,
            data: _datavalue,
            fill: _Fill,
            backgroundColor: _BackgroundColor[_colorstyle - 1],
            borderColor: _BorderColor[_colorstyle - 1],
            borderWidth: _BorderWidth
        };

        return _dataset;
    }

    function getRadarGraphic() {
        var _data = {
            labels: [],
            datasets: []
        };

        _data.labels = RLabelSet;
        for (i = 0; i < DeviceNameSet.length; i++) {
            _data.datasets[i] = getRadarDatasetCanvas(DeviceNameSet[i], ColorIdSet[i], DataSetCollection[i]);
        };

        return _data;
    };

    var ctx = document.getElementById(ControlId);
    return new Chart(ctx, { type: 'radar', data: getRadarGraphic(), options: _maxoptions});
}

function AddPointToRadar(_device, _label, _value, _condition) {

    var _exists = false; 
    for (i = 0; i < RadarChart.data.datasets.length; i++) {
        if (RadarChart.data.datasets[i].label == _device) _exists = true;
    }

    if (_exists) {
        var _lastpointer = RadarPointer;
        if (RadarPointer < RadarChart.data.labels.length - 1) {
            RadarPointer++
        } else {
            RadarPointer = 0
        };

        for (i = 0; i < RadarChart.data.datasets.length; i++) {
            if (!_condition) {
                if (RadarChart.data.datasets[i].label == _device) {
                    RadarChart.data.datasets[i].data.push(_value);
                } else {
                    var _length = RadarChart.data.datasets[i].data.length;
                    var _lastvalue = RadarChart.data.datasets[i].data[_length - 1];
                    RadarChart.data.datasets[i].data.push(_lastvalue);
                }
            } else {
                if (RadarChart.data.datasets[i].label == _device) {
                    RadarChart.data.datasets[i].data[RadarPointer] = _value;
                } else {
                    RadarChart.data.datasets[i].data[RadarPointer] = RadarChart.data.datasets[i].data[_lastpointer];
                }
            }
        };
        RadarChart.update();
    }
}