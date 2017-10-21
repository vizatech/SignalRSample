using System;

namespace SignalR.StockTicker
{
    public class Device
    {
        private Double _magnitude;

        /// <summary>
        ///
        /// DEVICE DATA STRUCTURE:
        ///
        /// Owner ID
        ///
        /// Device ID
        /// Device Name
        /// Device Class
        /// Device Data Class
        /// Device Sensor Type
        /// Measurement Unit
        /// Readout Stamp
        /// Datatime Stamp
        /// Average Value
        /// Averaging Period
        /// Deviation Absolute
        /// Deviation Percentage
        ///
        /// </summary>

        public string DeviceOwnerID  //device's owner ID
            { get; set; }

        public string DeviceID  //device unique ID
            { get; set; }

        public string DeviceName  //Name of device given by user
            { get; set; }

        public string DeviceClass //If it is Sensor or Actuator
            { get; set; }

        public string DeviceDataClass //If it is Digital or Analog
            { get; set; }

        public string DeviceSensorType //If it is temprete sensor or current and so on...
            { get; set; }

        public string MgrUnit // mA, V, C, F and so on...
            { get; set; }

        public Double ReadoutStamp //meaning of a mesured data from device
        {
            get
            { return _magnitude; }
            set
            {if (_magnitude == value) {return;}
             _magnitude = value;
             if (AverageValue == 0) { AverageValue = _magnitude; }
            }
        }

        public String DatatimeStamp //meaning of a mesured data from device
        {
            get
            { return DateTime.Now.ToString(); }   
        }

        public Double AverageValue
            { get; private set; }

        public string AveragingPeriod
        { get; set; }

        public Double DeviationAbs
        {
            get
            { return ReadoutStamp - AverageValue; }
        }

        public Double DeviationPrc
        {
            get
            { return (double)Math.Round(DeviationAbs / ReadoutStamp, 4); }
        }
    }
}