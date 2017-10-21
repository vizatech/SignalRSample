using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalR.StockTicker
{

    public class DeviceHub : Hub
    {
        private readonly DevicesDataStream _deviceTicker;

        public DeviceHub() : this(DevicesDataStream.Instance) { }

        public DeviceHub(DevicesDataStream deviceTicker)
        {
            _deviceTicker = deviceTicker;
        }

        public IEnumerable<Device> GetAllDevicesOnDemand()
        {
            return _deviceTicker.GetAllDevices();
        }
    }
}