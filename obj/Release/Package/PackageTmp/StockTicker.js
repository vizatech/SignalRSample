// A simple templating method for replacing placeholders enclosed in curly braces.
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

$(function () {

    var liveConnection = $.connection.deviceHub, // the generated client-side hub proxy
        rises = '▲',
        falls = '▼',
        alarm = '!!',
        sign = '',
        $stockTable = $('#stockTable'),
        $stockTableBody = $stockTable.find('tbody'),
        rowTemplate =   '<tr data-symbol="{DeviceID}">' +
                            '<td>{DeviceOwnerID}</td>' +
                            '<td>{DeviceID}</td>' +
                            '<td>{DeviceName}</td>' +
                            '<td>{DeviceClass}</td>' +
                            '<td>{DeviceDataClass}</td>' +
                            '<td>{DeviceSensorType}</td>' +
                            '<td>{MgrUnit}</td>' +
                            '<td>{sign}</td>' +
                            '<td>{ReadoutStamp}</td>' +
                            '<td>{DatatimeStamp}</td>' +
                            '<td>{AverageValue}</td>' +
                            '<td>{AveragingPeriod}</td>' +
                            '<td>{DeviationAbs}</td>' +
                            '<td>{DeviationPrc}</td>' +
                        '</tr>';

    function formatStock(stock) {
        return $.extend(stock, {
            ReadoutStamp: stock.ReadoutStamp.toFixed(4),
            DeviationAbs: stock.DeviationAbs.toFixed(4),
            AverageValue: stock.AverageValue.toFixed(4),
            DeviationPrc: (stock.DeviationPrc * 100).toFixed(4) + '%',
            sign: stock.DeviationAbs === 0 ? '' : stock.DeviationAbs >= 0 ? rises : falls
        });
    }

    function init() {
        liveConnection.server.getAllDevicesOnDemand().done(function (stocks) {
            $stockTableBody.empty();
            $.each(stocks, function () {
                var stock = formatStock(this);
                $stockTableBody.append(rowTemplate.supplant(stock));
            });
        });
    }

    // Add a client-side hub method that the server will call
    liveConnection.client.updateDeviceDataOnClient = function (stock) {
        var displayStock = formatStock(stock),
            $row = $(rowTemplate.supplant(displayStock));

        $stockTableBody.find('tr[data-symbol=' + stock.DeviceID + ']')
            .replaceWith($row);
    }

    // connection initialization
    $.connection.hub.start().done(init);

});