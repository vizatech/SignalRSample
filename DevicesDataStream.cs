using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalR.StockTicker
{
    public class DevicesDataStream
    {
        // Singleton instance
        private readonly static Lazy<DevicesDataStream> 
            _instance = 
                new Lazy<DevicesDataStream>(() => 
                    new DevicesDataStream(GlobalHost.ConnectionManager.GetHubContext<DeviceHub>().Clients));

        private readonly ConcurrentDictionary<string, Device> 
            _devices = //потокобезопасная коллекция пар ключ-значение
                new ConcurrentDictionary<string, Device>();

        private readonly object 
            _updateStockPricesLock = new object();

        //stock can go up or down by a percentage of this factor on each change
        private readonly double 
            _rangePercent = .05;

        private readonly TimeSpan 
            _updateInterval = TimeSpan.FromMilliseconds(250);

        private readonly Random 
            _updateOrNotRandom = new Random();

        private readonly Timer 
            _timer; 

        private volatile bool 
            _updatingStockPrices = false;

        private DevicesDataStream(IHubConnectionContext<dynamic> clients)
        {
            Clients = clients;
            _devices.Clear();
            var devices = new List<Device>
            {
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device01",   DeviceName = "MotorTemperature",    DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Temperature",   MgrUnit = "C",      ReadoutStamp = 5.6 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device02",   DeviceName = "MotorCurrent",        DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Current",       MgrUnit = "mA",     ReadoutStamp = 7.45 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device03",   DeviceName = "MotorVoltage",        DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Voltage",       MgrUnit = "V",      ReadoutStamp = 9.75 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device04",   DeviceName = "RelayTemperature",    DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Temperature",   MgrUnit = "C",      ReadoutStamp = 2.6 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device05",   DeviceName = "RelayVoltage",        DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Voltage",       MgrUnit = "V",      ReadoutStamp = 5.04 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device06",   DeviceName = "CameraTemperature",   DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Temperature",   MgrUnit = "C",      ReadoutStamp = 4.6 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device07",   DeviceName = "CameraAirControl",    DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Concentration", MgrUnit = "%",      ReadoutStamp = 6.74 },
                new Device { DeviceOwnerID = "OID0000001",  DeviceID = "Device08",   DeviceName = "RefregiratorControl", DeviceClass = "Sensor",     DeviceDataClass = "Analog",     DeviceSensorType = "Pressure",      MgrUnit = "atm",    ReadoutStamp = 3.70 }
        };

            devices.ForEach(stock => _devices.TryAdd(stock.DeviceName, stock));
                _timer = new Timer(UpdateStockPrices, null, _updateInterval, _updateInterval);
        }
        public static DevicesDataStream Instance
        {
            get { return _instance.Value; }
        }

        //список интерфейсов клиентов
        private IHubConnectionContext<dynamic> 
            Clients { get; set; }

        //список интерфейсов тикеров
        public IEnumerable<Device> 
            GetAllDevices() { return _devices.Values; }

        //
        private void UpdateStockPrices(object state)
        {
            lock (_updateStockPricesLock)
            {
                if (!_updatingStockPrices)
                {
                    _updatingStockPrices = true;
                    foreach (var stock in _devices.Values)
                    {
                        if (TryUpdateDeviceData(stock))
                        { BroadcastDeviceData(stock); }
                    }
                    _updatingStockPrices = false;
                }
            }
        }
        private bool TryUpdateDeviceData(Device device)
        {
            // if update data
            Boolean update = _updateOrNotRandom.NextDouble() > 0.1;
            if (update) { return false; }

            // calculation Of Deviation
            Double valueOfDeviation = _updateOrNotRandom.NextDouble() * _rangePercent;
            Double percentChange = valueOfDeviation * device.ReadoutStamp;
            Double deviation = Math.Round(device.ReadoutStamp * percentChange, 4);

            // if deviation positiv or negative
            Boolean dirrectionOfDeviation = _updateOrNotRandom.NextDouble() > 0.510;
            deviation = dirrectionOfDeviation ? deviation : -deviation;

            // calculation of new value for data
            device.ReadoutStamp += deviation;
            return true;
        }
        private void BroadcastDeviceData(Device stock) // updates data on client
        {
            Clients.All.updateDeviceDataOnClient(stock);
        }
    }
}