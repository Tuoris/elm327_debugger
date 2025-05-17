let CONFIGS = [];

const logsContainer = document.querySelector("#logs");

function log(string, level = "debug") {
  const newLogLine = document.createElement("code");
  const timestampSpan = document.createElement("span");
  timestampSpan.classList.add("logTimestamp");
  timestampSpan.innerText = `${new Date().toISOString()}: `;
  const messageSpan = document.createElement("span");
  messageSpan.innerText = `${string}`;
  newLogLine.appendChild(timestampSpan);
  newLogLine.appendChild(messageSpan);
  newLogLine.classList.add("log");
  newLogLine.classList.add(level);
  logsContainer.appendChild(newLogLine);
  newLogLine.scrollIntoView();
}

i18next
  .init({
    lng: APP_LANGUAGE,
    debug: true,
    resources: {
      uk: {
        translation: {
          elm327Clone: "Блакитний клон ELM 327",
          vgateIcar2: "Vgate iCar2 Bluetooth 4.0",
          pressToStart: `Натисніть кнопку "З'єднатись з ELM 327" для початку роботи.`,
          requestingAnyElm327Device: "Запит будь-якого пристрою Bluetooth, який підтримує сервіс ELM327...",
          requestingDevice: `Запит пристрою: {{deviceName}} ({{deviceId}})`,
          errorDescription: "Помилка: {{error}}",
          gattServerConnected: "Сервер GATT підключено.",
          deviceServiceRetrieving: "Отримання сервісу пристрою...",
          serviceFound: "Сервіс знайдено, отримання характеристики (джерела даних)...",
          serviceNotSupported: "Сервіс {{serviceUuid}} не підтримується...",
          deviceDoesNotSupportAnyProfile: "Пристрій не підтримує жодного з профілів комунікації.",
          characteristicFound: "Знайдено характеристику: {{characteristicUUID}}",
          creatingSubscription: "Створення підписки на отримання відповідей.",
          subscriptionCreated: "Підписку створено - готовий до роботи.",
          valueReceived: "Отримано: {{value}}",
          attemptToSendCommandFailed: "Спроба надіслати команду: {{data}} - відсутнє підключення.",
          waitingForPreviousCommand: "Очікую на відповідь на попередню команду...",
          previousCommandTimeout:
            "Відповідь від попередньої команди не отримано протягом 1 секунди - її буде скасовано!",
          sendingData: "Надсилання: {{data}}",
          monitoringStatusAfterFaultCodesClearing: "Статус моніторингу після видалення кодів несправностей",
          engineCoolantTemperature: "Температура ох. рідини двигуна",
          engineOilTemperature: "Температура моторної оливи",
          calculatedEngineLoad: "Розрахункове навантаження двигуна",
          engineRpm: "Оберти двигуна",
          speed: "Швидкість",
          airIntakeTemperature: "Температура повітря на вході",
          massAirflowSensor: "Датчик масової витрати повітря",
          fuelLevel: "Рівень палива в баку",
          ecuVoltage: "Напруга на ЕБУ",
          fuelConsumption: "Витрата пального",
          increaseResponseTime: "Збільшити час відповіді",
          hkmcEvBmsEcu: "HKMC EV блок BMS",
          hkmcEvBmsInfo: "HKMC EV інформація  #{{commandNo}} з BMS",
          hkmcEvClusterEcu: "HKMC EV блок CLUSTER",
          hkmcEvClusterInfo02: "HKMC EV інформація #2 з CLUSTER",
          hkmcEvAbsEcu: "HKMC EV блок ABS",
          hkmcEvAbsInfo01: "HKMC EV інформація #1 з ABS",
          hkmcEvVmcuEcu: "HKMC EV блок VMCU",
          hkmcEvVmcuInfo01: "HKMC EV інформація #1 з VMCU",
          checkEngineLightOn: 'Лампа "Check Engine" горить',
          checkEngineLightOff: 'Лампа "Check Engine" не горить',
          confirmedEmissionsRelatedDtcs:
            "Кількість підтверджених помилок, пов'язаних з викидами: {{numberOfConfirmedEmissionsRelatedDtcs}}",
          engineCoolantTemperatureValue: "Температура охолоджувальної рідини двигуна: {{temperatureValue}} °C",
          vehicleVin: "VIN: {{vinString}}",
          engineLoad: "Розрахункове навантаження двигуна: {{engineLoadValue}} %",
          engineOilTemperatureValue: "Температура моторної оливи: {{temperatureValue}} °C",
          engineRpmValue: "Оберти двигуна: {{rpmValue}} об/хв",
          vehicleSpeed: "Швидкість: {{speedValue}} км/год",
          airIntakeTemperatureValue: "Температура повітря на вході: {{temperatureValue}} °C",
          massAirFlow: "Масова витрата повітря: {{massAirFlowValue}} г/с",
          fuelTankLevel: "Рівень палива в баку: {{fuelTankLevelValue}} %",
          ecuVoltageValue: "Напруга на електронному блоці управління: {{voltageValue}} В",
          fuelConsumptionRate: "Витрата пального: {{rateValue}} л/год",
          bmsInfoError:
            "Помилка при отриманні інформації з BMS #1 HKMC EV - неправильна кількість пакетів: {{separatePacketBytesLength}}.",
          bmsInfo1: "Інформація з BMS #1 HKMC EV:",
          bmsInfoSoc: "- рівень заряду: {{socValue}} %",
          bmsInfoMaxRegen: "- доступна потужність рекуперації: {{maxRegenerationPower}} кВт",
          bmsInfoMaxPower: "- доступна потужність: {{maxPower}} кВт",
          bmsInfoBatteryMaxT: "- температура акумулятора (макс.): {{batteryMaxT}} °C",
          bmsInfoBatteryMinT: "- температура акумулятора (мін.): {{batteryMinT}} °C",
          bmsInfoBatteryModuleTemp: "- температура модуля {{moduleNumber}} акумулятора: {{batteryModuleTemp}} °C",
          bmsInfoBatteryInletT: "- температура охолоджувальної рідини акумулятора: {{batteryInletT}} °C",
          bmsInfoMinCellVoltage: "- мінімальна напруга комірки: {{minCellVoltageValue}} В",
          bmsInfoMaxCellVoltage: "- максимальна напруга комірки: {{maxCellVoltageValue}} В",
          bmsInfoDischargePower: "- потужність розряджання акумулятора: {{dischargePowerValue}} кВт",
          bmsInfoChargePower: "- потужність заряджання акумулятора: {{chargePowerValue}} кВт",
          bmsInfoDischargeCurrent: "- струм батареї: {{dischargeCurrentValue}} А - розряджання",
          bmsInfoChargeCurrent: "- струм батареї: {{chargeCurrentValue}} А - заряджання",
          bmsInfoBatteryVoltage: "- напруга батареї: {{batteryVoltageValue}} В",
          bmsInfoBatteryAuxBatteryVoltage: "- напруга 12В батареї: {{battery12VVoltage}} В",
          bmsInfoCumulativeCapacityCharged: "- сукупна заряджена ємність {{cumulativeCapacityCharged}} А·год",
          bmsInfoCumulativeCapacityDischarged: "- сукупна розряджена ємність {{cumulativeCapacityDischarged}} А·год",
          bmsInfoCumulativeEnergyCharged: "- сукупна заряджена енергія {{cumulativeEnergyCharged}} кВт·год",
          bmsInfoCumulativeEnergyDischarged: "- сукупна розряджена енергія {{cumulativeEnergyDischarged}} кВт·год",
          bmsInfoOperationalTimeSeconds: "- час експлуатації: {{operationalTimeSeconds}} секунд",
          bmsInfoOperationalTimeHours: "- час експлуатації: {{operationalTimeHours}} години",
          bmsInfo5: "Інформація #5 з BMS HKMC EV:",
          bmsSoh: "- здоров'я акумулятора (SOH): {{sohValue}} %",
          bmsHeaterTemp: "- температура обігрівача акумулятора: {{heaterTemp}} °C",
          bmsSocDisplay: `- рівень заряду: {{socDisplay}} %`,
          mileageKm: "- пробіг {{odometerKm}} км",
          allParamsNiroKona: "Kona/Niro всі параметри",
          cellVoltage: "- напруга комірки #{{cellNumber}}: {{cellVoltage}} В",
          bmsCoolingWaterTemp: "- температура охолоджувальної рідини {{coolingWaterTemp}} °C",
          bmsUnknownTempC: "- невідома температура С {{unknownTempC}} °C",
          bmsMode: "- режим BMS {{bmsMode}}",
          bmsUnknownTempD: "- невідома температура D {{unknownTempD}} °C",
          calculatedParamsInfo: "Розраховані параметри:",
          calculateAverageConsumption: "- середня витрата (за весь пробіг) {{averageConsumption}} кВт·год/100км",
          calculatedDischargeEfficiency:
            "- середня ефективність при розряджанні (за весь пробіг): {{dischargeEfficiency}} %",
          steeringWheelAngle: "- кут повороту керма: {{steeringWheelAngle}}°",
          brakePedalPositionRelative: "- позиція педалі гальм: {{brakePedalPositionRelative}} %",
          acceleratorPedalPositionRelative: "- позиція педалі акселератора: {{acceleratorPedalPositionRelative}} %",
          hkmcVehicleSpeed: "- швидкість: {{vehicleSpeed}} км/год",
          repeatNumberMark: "------------Повтор {{repeatNumber}}------------",
          repeatNumberMarkEnd: ">>>>>>>>>>Повтор {{repeatNumber}}>>>>>>>>>>",
          gpsTimestamp: "GPS час показу: {{timestamp}}",
          gpsAccuracy: "Точність GPS: {{accuracy}}",
          gpsLatitude: "Широта GPS: {{latitude}}",
          gpsLongitude: "Довгота GPS: {{longitude}}",
          gpsAltitude: "Висота GPS: {{altitude}}",
          gpsAltitudeAccuracy: "Точність висоти GPS: {{altitudeAccuracy}}",
          gpsHeading: "Напрямок GPS: {{heading}}",
          gpsSpeed: "Швидкість GPS: {{speed}}",
          commandExecutionTime: `Час виконання команди: {{commandExecutionTime}} с`,
        },
      },
      en: {
        translation: {
          elm327Clone: "Blue ELM 327 clone",
          vgateIcar2: "Vgate iCar2 Bluetooth 4.0",
          pressToStart: `Click the "Connect to ELM 327" button to begin.`,
          requestingAnyElm327Device: "Requesting any Bluetooth device that supports the ELM327 service...",
          requestingDevice: `Requesting device: {{deviceName}} ({{deviceId}})`,
          errorDescription: `Error: {{error}}`,
          gattServerConnected: "GATT server connected.",
          deviceServiceRetrieving: "Retrieving device service...",
          serviceFound: "Service found, retrieving characteristic (data source)...",
          serviceNotSupported: "Service {{serviceUuid}} is not supported...",
          deviceDoesNotSupportAnyProfile: "Device does not support any communication profiles.",
          characteristicFound: "Found characteristic: {{characteristicUUID}}",
          creatingSubscription: "Creating subscription for receiving responses.",
          subscriptionCreated: "Subscription created - ready to work.",
          valueReceived: "Received: {{value}}",
          attemptToSendCommandFailed: "Attempt to send command: {{data}} - connection is missing.",
          waitingForPreviousCommand: "Waiting response from previous command...",
          previousCommandTimeout:
            "Response from previous command is not received in 1 second, previous command will be discarded!",
          sendingData: "Sending: {{data}}",
          monitoringStatusAfterFaultCodesClearing: "Monitoring status after fault codes clearing",
          engineCoolantTemperature: "Engine coolant temperature",
          engineOilTemperature: "Engine oil temperature",
          calculatedEngineLoad: "Calculated engine load",
          engineRpm: "Engine RPM",
          speed: "Speed",
          airIntakeTemperature: "Air intake temperature",
          massAirflowSensor: "Mass airflow sensor",
          fuelLevel: "Fuel level",
          ecuVoltage: "ECU voltage",
          fuelConsumption: "Fuel consumption",
          increaseResponseTime: "Increase response time",
          hkmcEvBmsEcu: "HKMC EV BMS ECU",
          hkmcEvBmsInfo: "HKMC EV BMS info #{{commandNo}}",
          hkmcEvClusterEcu: "HKMC EV CLUSTER ECU",
          hkmcEvClusterInfo02: "HKMC EV CLUSTER info #2",
          hkmcEvAbsEcu: "HKMC EV ABS ECU",
          hkmcEvAbsInfo01: "HKMC EV ABS ECU info #1",
          hkmcEvVmcuEcu: "HKMC EV VMCU ECU",
          hkmcEvVmcuInfo01: "HKMC EV VMCU ECU info #1",
          checkEngineLightOn: "Check Engine light is on",
          checkEngineLightOff: "Check Engine light is off",
          confirmedEmissionsRelatedDtcs:
            "Number of confirmed DTCs related to emissions: {{numberOfConfirmedEmissionsRelatedDtcs}}",
          engineCoolantTemperatureValue: "Engine coolant temperature: {{temperatureValue}} °C",
          vehicleVin: "VIN: {{vinString}}",
          engineLoad: "Calculated engine load: {{engineLoadValue}} %",
          engineOilTemperatureValue: "Engine oil temperature: {{temperatureValue}} °C",
          engineRpmValue: "Engine RPM: {{rpmValue}}",
          vehicleSpeed: "Speed: {{speedValue}} km/h",
          airIntakeTemperatureValue: "Air intake temperature: {{temperatureValue}} °C",
          massAirFlow: "Mass airflow: {{massAirFlowValue}} g/s",
          fuelTankLevel: "Fuel tank level: {{fuelTankLevelValue}} %",
          ecuVoltageValue: "ECU voltage: {{voltageValue}} V",
          fuelConsumptionRate: "Fuel consumption rate: {{rateValue}} l/h",
          bmsInfoError:
            "Error retrieving information from BMS #1 HKMC EV - incorrect number of packets: {{separatePacketBytesLength}}.",
          bmsInfo1: "BMS info #1 HKMC EV:",
          bmsInfoSoc: "- state of charge: {{socValue}} %",
          bmsInfoMaxRegen: "- available regenerative power: {{maxRegenerationPower}} kW",
          bmsInfoMaxPower: "- available power: {{maxPower}} kW",
          bmsInfoBatteryMaxT: "- battery temperature (max.): {{batteryMaxT}} °C",
          bmsInfoBatteryMinT: "- battery temperature (min.): {{batteryMinT}} °C",
          bmsInfoBatteryModuleTemp: "- battery module #{{moduleNumber}} temperature: {{batteryModuleTemp}} °C",
          bmsInfoBatteryInletT: "- battery inlet (cooling liquid) temperature: {{batteryInletT}} °C",
          bmsInfoMinCellVoltage: "- minimum cell voltage: {{minCellVoltageValue}} V",
          bmsInfoMaxCellVoltage: "- maximum cell voltage: {{maxCellVoltageValue}} V",
          bmsInfoDischargePower: "- battery discharge power: {{dischargePowerValue}} kW",
          bmsInfoChargePower: "- battery charge power: {{chargePowerValue}} kW",
          bmsInfoDischargeCurrent: "- battery current: {{dischargeCurrentValue}} A - discharging",
          bmsInfoChargeCurrent: "- battery current: {{chargeCurrentValue}} A - charging",
          bmsInfoBatteryVoltage: "- battery voltage: {{batteryVoltageValue}} V",
          bmsInfoBatteryAuxBatteryVoltage: "- 12V battery voltage: {{battery12VVoltage}} V",
          bmsInfoCumulativeCapacityCharged: "- cumulative capacity charged {{cumulativeCapacityCharged}} Ah",
          bmsInfoCumulativeCapacityDischarged: "- cumulative capacity discharged {{cumulativeCapacityDischarged}} Ah",
          bmsInfoCumulativeEnergyCharged: "- cumulative energy charged {{cumulativeEnergyCharged}} kWh",
          bmsInfoCumulativeEnergyDischarged: "- cumulative energy charged {{cumulativeEnergyDischarged}} kWh",
          bmsInfoOperationalTimeSeconds: "- operational time: {{operationalTimeSeconds}} seconds",
          bmsInfoOperationalTimeHours: "- operational time: {{operationalTimeHours}} hours",
          bmsInfo5: "BMS info #5 HKMC EV:",
          bmsSoh: "- battery state of health (SOH): {{sohValue}} %",
          bmsHeaterTemp: "- battery heater temperature: {{heaterTemp}} °C",
          bmsSocDisplay: `- state of charge (display): {{socDisplay}} %`,
          mileageKm: "- mileage {{odometerKm}} km",
          allParamsNiroKona: "Kona/Niro all parameters",
          cellVoltage: "- cell #{{cellNumber}} voltage: {{cellVoltage}} V",
          bmsCoolingWaterTemp: "- cooling water temperature {{coolingWaterTemp}} °C",
          bmsUnknownTempC: "- unknown temperature С {{unknownTempC}} °C",
          bmsMode: "- BMS mode {{bmsMode}}",
          bmsUnknownTempD: "- unknown temperature D {{unknownTempD}} °C",
          calculatedParamsInfo: "Calculated params:",
          calculateAverageConsumption: "- average consumption (lifetime): {{averageConsumption}} kWh/100km",
          calculatedDischargeEfficiency: "- discharge efficiency (lifetime): {{dischargeEfficiency}} %",
          steeringWheelAngle: "- steering wheel angle: {{steeringWheelAngle}}°",
          brakePedalPositionRelative: "- brake pedal position: {{brakePedalPositionRelative}} %",
          acceleratorPedalPositionRelative: "- accelerator pedal position: {{acceleratorPedalPositionRelative}} %",
          hkmcVehicleSpeed: "- speed: {{vehicleSpeed}} km/h",
          repeatNumberMark: "------------Repeat {{repeatNumber}}------------",
          repeatNumberMarkEnd: ">>>>>>>>>>Repeat {{repeatNumber}}>>>>>>>>>>",
          gpsTimestamp: "GPS timestamp: {{timestamp}}",
          gpsAccuracy: "GPS accuracy: {{accuracy}}",
          gpsLatitude: "GPS latitude: {{latitude}}",
          gpsLongitude: "GPS longitude: {{longitude}}",
          gpsAltitude: "GPS altitude: {{altitude}}",
          gpsAltitudeAccuracy: "GPS altitude accuracy: {{altitudeAccuracy}}",
          gpsHeading: "GPS heading: {{heading}}",
          gpsSpeed: "GPS speed: {{speed}}",
          commandExecutionTime: `Command execution time: {{commandExecutionTime}} s`,
        },
      },
    },
  })
  .then(function (t) {
    log(t("pressToStart"), "info");

    CONFIGS = [
      {
        name: i18next.t("elm327Clone"),
        serviceUuid: "0000fff0-0000-1000-8000-00805f9b34fb",
        characteristicUuid: 0xfff1,
      },
      {
        name: i18next.t("vgateIcar2"),
        serviceUuid: "e7810a71-73ae-499d-8c15-faa9aef0c3f2",
        characteristicUuid: "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f",
      },
    ];

    COMMAND_LABELS = {
      [COMMANDS.VIN]: "VIN",
      [COMMANDS.MONITOR_STATUS_SINCE_DTCS_CLEARED]: i18next.t("monitoringStatusAfterFaultCodesClearing"),
      [COMMANDS.ENGINE_COOLANT_TEMPERATURE]: i18next.t("engineCoolantTemperature"),
      [COMMANDS.ENGINE_OIL_TEMPERATURE]: i18next.t("engineOilTemperature"),
      [COMMANDS.CALCULATED_ENGINE_LOAD]: i18next.t("calculatedEngineLoad"),
      [COMMANDS.ENGINE_SPEED]: i18next.t("engineRpm"),
      [COMMANDS.VEHICLE_SPEED]: i18next.t("speed"),
      [COMMANDS.INTAKE_AIR_TEMPERATURE]: i18next.t("airIntakeTemperature"),
      [COMMANDS.MASS_AIR_FLOW_SENSOR]: i18next.t("massAirflowSensor"),
      [COMMANDS.FUEL_TANK_LEVEL]: i18next.t("fuelLevel"),
      [COMMANDS.CONTROL_MODULE_VOLTAGE]: i18next.t("ecuVoltage"),
      [COMMANDS.ENGINE_FUEL_RATE]: i18next.t("fuelConsumption"),
      [COMMANDS.EXTENDED_TIMEOUT]: i18next.t("increaseResponseTime"),
      [COMMANDS.HKMC_EV_BMS_ECU]: i18next.t("hkmcEvBmsEcu"),
      [COMMANDS.HKMC_EV_BMS_INFO_01]: i18next.t("hkmcEvBmsInfo", { commandNo: 1 }),
      [COMMANDS.HKMC_EV_BMS_INFO_02]: i18next.t("hkmcEvBmsInfo", { commandNo: 2 }),
      [COMMANDS.HKMC_EV_BMS_INFO_03]: i18next.t("hkmcEvBmsInfo", { commandNo: 3 }),
      [COMMANDS.HKMC_EV_BMS_INFO_04]: i18next.t("hkmcEvBmsInfo", { commandNo: 4 }),
      [COMMANDS.HKMC_EV_BMS_INFO_05]: i18next.t("hkmcEvBmsInfo", { commandNo: 5 }),
      [COMMANDS.HKMC_EV_BMS_INFO_06]: i18next.t("hkmcEvBmsInfo", { commandNo: 6 }),
      [COMMANDS.HKMC_EV_CLUSTER_ECU]: i18next.t("hkmcEvClusterEcu"),
      [COMMANDS.HKMC_EV_CLUSTER_INFO_02]: i18next.t("hkmcEvClusterInfo02"),
      [COMMANDS.HKMC_EV_ABS_ECU]: i18next.t("hkmcEvAbsEcu"),
      [COMMANDS.HKMC_EV_ABS_INFO_01]: i18next.t("hkmcEvAbsInfo01"),
      [COMMANDS.HKMC_EV_VMCU_ECU]: i18next.t("hkmcEvVmcuEcu"),
      [COMMANDS.HKMC_EV_VMCU_INFO_1]: i18next.t("hkmcEvVmcuInfo01"),
    };

    const commandsContainer = document.querySelector("#commands");
    commandsContainer.innerHTML = "";

    const allHkmcCommandButton = document.createElement("button");
    allHkmcCommandButton.innerText = i18next.t("allParamsNiroKona");
    const readHkmcData = async () => {
      let allData = {};

      for (let command of [
        COMMANDS.HKMC_EV_BMS_ECU,
        COMMANDS.HKMC_EV_BMS_INFO_01,
        COMMANDS.HKMC_EV_BMS_INFO_02,
        COMMANDS.HKMC_EV_BMS_INFO_03,
        COMMANDS.HKMC_EV_BMS_INFO_04,
        COMMANDS.HKMC_EV_BMS_INFO_05,
        COMMANDS.HKMC_EV_BMS_INFO_06,
        COMMANDS.HKMC_EV_CLUSTER_ECU,
        COMMANDS.HKMC_EV_CLUSTER_INFO_02,
      ]) {
        const response = await sendData(command);
        if (command.startsWith("22")) {
          allData = { ...allData, ...response };
        }
      }

      log(i18next.t("calculatedParamsInfo"), "info");

      if (allData["cumulativeEnergyDischarged"] && allData["odometerKm"]) {
        const averageConsumption = (allData["cumulativeEnergyDischarged"] / allData["odometerKm"]) * 100;

        log(i18next.t("calculateAverageConsumption", { averageConsumption: averageConsumption.toFixed(1) }), "info");
      }

      if (allData["cumulativeEnergyDischarged"] && allData["cumulativeEnergyCharged"]) {
        const dischargeEfficiency = (allData["cumulativeEnergyDischarged"] / allData["cumulativeEnergyCharged"]) * 100;

        log(
          i18next.t("calculatedDischargeEfficiency", { dischargeEfficiency: dischargeEfficiency.toFixed(1) }),
          "info"
        );
      }
    };
    allHkmcCommandButton.addEventListener("click", readHkmcData);
    allHkmcCommandButton.command = readHkmcData;
    commandsContainer.appendChild(allHkmcCommandButton);

    for (const command of Object.values(COMMANDS)) {
      const commandButton = document.createElement("button");
      const commandHandler = async () => await sendData(command);
      commandButton.addEventListener("click", commandHandler);
      commandButton.command = commandHandler;
      commandButton.innerText = `${COMMAND_LABELS[command] ?? "Unknown command"} (${command})`;

      commandsContainer.appendChild(commandButton);
    }
  });

let selectedDevice = null;

async function onRequestBluetoothDeviceButtonClick() {
  log(i18next.t("requestingAnyElm327Device"));

  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: CONFIGS.map((config) => config.serviceUuid),
    });

    log(i18next.t("requestingDevice", { deviceName: device.name, deviceId: device.id }));
    selectedDevice = device;
    connectAndSetupBluetoothScanner();
  } catch (error) {
    log(i18next.t("errorDescription", { error }), "error");
  }
}

document.querySelector("#requestDevice").addEventListener("click", onRequestBluetoothDeviceButtonClick);

let writeCharacteristic = null;
let responseResolve = null;

async function connectAndSetupBluetoothScanner() {
  if (!selectedDevice) {
    return;
  }

  const server = await selectedDevice.gatt.connect();
  log(i18next.t("gattServerConnected"));
  log(i18next.t("deviceServiceRetrieving"));

  let service;
  let serviceIndex;
  for (const [index, config] of CONFIGS.entries()) {
    try {
      service = await server.getPrimaryService(config.serviceUuid);
      serviceIndex = index;
      log(i18next.t("serviceFound"));
    } catch {
      log(i18next.t("serviceNotSupported", { serviceUuid: config.serviceUuid }));
    }
  }

  if (!service) {
    log(i18next.t("deviceDoesNotSupportAnyProfile"), "error");
    return;
  }

  const characteristicUUID = CONFIGS[serviceIndex].characteristicUuid;
  const characteristic = await service.getCharacteristic(characteristicUUID);

  log(i18next.t("characteristicFound", { characteristicUUID }));
  writeCharacteristic = characteristic;

  await writeCharacteristic.startNotifications();
  log(i18next.t("creatingSubscription"));
  writeCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
    const rawValue = event.currentTarget.value;
    receiveValue(rawValue);
  });

  await sendData("AT WS");
  await sendData("AT E0");
  await sendData("AT L0");
  await sendData("AT AL");
  await sendData("AT AT1");
  await sendData("0100");

  log(i18next.t("subscriptionCreated"));
}

let receiveBuffer = "";
let pendingCommandPromise = null;
let isPendingCommand = false;
let lastCommandTimestamp = null;

function receiveValue(rawValue) {
  const rawBytes = Array.from(new Int8Array(rawValue.buffer)).map((n) => n.toString(16).padStart(2, "0"));
  console.log(`Raw bytes: ${rawBytes.join(" ")}`);
  const value = new TextDecoder().decode(rawValue).trim();
  log(i18next.t("valueReceived", { value, interpolation: { escapeValue: false } }));

  receiveBuffer += value;

  if (value.includes(">")) {
    if (lastCommandTimestamp) {
      const commandExecutionTime = (new Date().valueOf() - lastCommandTimestamp) / 1000;

      log(i18next.t("commandExecutionTime", { commandExecutionTime: commandExecutionTime.toFixed(2) }));
    }
    const result = parseResponse(receiveBuffer);
    responseResolve(result);

    receiveBuffer = "";
    isPendingCommand = false;
  }
}

let currentCommand = "";

const sendData = async (data) => {
  if (!writeCharacteristic) {
    log(i18next.t("attemptToSendCommandFailed", { data }), "error");
    return;
  }

  lastCommandTimestamp = new Date().valueOf();

  if (isPendingCommand && pendingCommandPromise) {
    log(i18next.t("waitingForPreviousCommand"));
    const timeout = setTimeout(() => {
      log(i18next.t("previousCommandTimeout"), "error");
      responseResolve(null);
    }, 1000);
    await pendingCommandPromise;
    clearTimeout(timeout);
  }

  if (data) {
    log(i18next.t("sendingData", { data }));
    writeCharacteristic.writeValueWithResponse(new TextEncoder().encode(data + "\r"));
    isPendingCommand = true;
    currentCommand = data.trim();
  }

  pendingCommandPromise = new Promise((resolve) => {
    responseResolve = resolve;
  });

  return pendingCommandPromise;
};

const submitForm = document.querySelector("#submitForm");
submitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const dataToSent = formData.get("dataToSent");
  sendData(dataToSent);
});

const COMMANDS = {
  VIN: "0902",
  MONITOR_STATUS_SINCE_DTCS_CLEARED: "0101",
  ENGINE_COOLANT_TEMPERATURE: "0105",
  ENGINE_OIL_TEMPERATURE: "015C",
  CALCULATED_ENGINE_LOAD: "0104",
  ENGINE_SPEED: "010C",
  VEHICLE_SPEED: "010D",
  INTAKE_AIR_TEMPERATURE: "010F",
  MASS_AIR_FLOW_SENSOR: "0110",
  FUEL_TANK_LEVEL: "012F",
  CONTROL_MODULE_VOLTAGE: "0142",
  ENGINE_FUEL_RATE: "015E",
  EXTENDED_TIMEOUT: "AT ST96",
  HKMC_EV_BMS_ECU: "AT SH 7E4",
  HKMC_EV_BMS_INFO_01: "220101",
  HKMC_EV_BMS_INFO_02: "220102",
  HKMC_EV_BMS_INFO_03: "220103",
  HKMC_EV_BMS_INFO_04: "220104",
  HKMC_EV_BMS_INFO_05: "220105",
  HKMC_EV_BMS_INFO_06: "220106",
  HKMC_EV_CLUSTER_ECU: "AT SH 7C6",
  HKMC_EV_CLUSTER_INFO_02: "22B002",
  HKMC_EV_ABS_ECU: "AT SH 7D1",
  HKMC_EV_ABS_INFO_01: "22C101",
  HKMC_EV_VMCU_ECU: "AT SH 7E2",
  HKMC_EV_VMCU_INFO_1: "2101",
};

let COMMAND_LABELS = {};

const handlers = {
  [COMMANDS.VIN]: parseVINResponse,
  [COMMANDS.MONITOR_STATUS_SINCE_DTCS_CLEARED]: parseMonitorStatusSinceDtcsCleared,
  [COMMANDS.ENGINE_COOLANT_TEMPERATURE]: parseEngineCoolantTemperature,
  [COMMANDS.ENGINE_OIL_TEMPERATURE]: parseEngineOilTemperature,
  [COMMANDS.CALCULATED_ENGINE_LOAD]: parseCalculatedEngineLoadResponse,
  [COMMANDS.ENGINE_SPEED]: parseEngineSpeed,
  [COMMANDS.VEHICLE_SPEED]: parseVehicleSpeed,
  [COMMANDS.INTAKE_AIR_TEMPERATURE]: parseIntakeAirTemperature,
  [COMMANDS.MASS_AIR_FLOW_SENSOR]: parseMassAirFlowSensorValue,
  [COMMANDS.FUEL_TANK_LEVEL]: parseFuelTankLevel,
  [COMMANDS.ENGINE_FUEL_RATE]: parseEngineFuelRate,
  [COMMANDS.CONTROL_MODULE_VOLTAGE]: parseControlModuleVoltage,
  [COMMANDS.HKMC_EV_BMS_INFO_01]: parseHkmcEvBmsInfo01,
  [COMMANDS.HKMC_EV_BMS_INFO_02]: parseHkmcEvBmsInfo02,
  [COMMANDS.HKMC_EV_BMS_INFO_03]: parseHkmcEvBmsInfo03,
  [COMMANDS.HKMC_EV_BMS_INFO_04]: parseHkmcEvBmsInfo04,
  [COMMANDS.HKMC_EV_BMS_INFO_05]: parseHkmcEvBmsInfo05,
  [COMMANDS.HKMC_EV_BMS_INFO_06]: parseHkmcEvBmsInfo06,
  [COMMANDS.HKMC_EV_CLUSTER_INFO_02]: parseHkmcEvClusterInfo02,
  [COMMANDS.HKMC_EV_ABS_INFO_01]: parseHkmcEvAbsInfo01,
  [COMMANDS.HKMC_EV_VMCU_INFO_1]: parseHkmcEvVmcuInfo01,
};

function parseResponse(value) {
  const handler = handlers[currentCommand];
  if (handler) {
    const adaptedValue = adaptValueForCommand(value, currentCommand);
    return handler(adaptedValue);
  }

  return defaultHandler(value);
}

function defaultHandler(value) {
  if (value.includes(">")) {
    return true;
  }
}

function adaptValueForCommand(value, currentCommand) {
  let adaptedValue = value;

  if (!(currentCommand.startsWith("01") || currentCommand.startsWith("09"))) {
    return adaptedValue;
  }

  adaptedValue = value.replaceAll(/\s/g, "").replaceAll(">", "");

  const commandResponseSuccessHeader = currentCommand.replaceAll(/\s/g, "").replace(/^01/, "41").replace(/^09/, "49");

  console.log(adaptedValue, commandResponseSuccessHeader);

  if (!adaptedValue.includes(commandResponseSuccessHeader)) {
    return `<Invalid response> ${value}`;
  }

  const startDataIndex = adaptedValue.indexOf(commandResponseSuccessHeader);
  const dataSlice = adaptedValue.slice(startDataIndex);
  const chunks = [];
  for (let index = 0; index < Math.ceil(dataSlice.length / 2); index++) {
    const currentSlice = dataSlice.slice(index * 2, (index + 1) * 2);
    chunks.push(currentSlice);
  }

  return chunks.join(" ");
}

function parseMonitorStatusSinceDtcsCleared(value) {
  if (!value.startsWith("41 01")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const byteA = separateBytes[2];
  const byteABits = unsignedIntFromBytes(byteA).toString(2).padStart(8, "0");
  const checkEngineLightOn = byteABits[0] === "1";
  const numberOfConfirmedEmissionsRelatedDtcs = parseInt(byteABits.slice(1), 2);

  log(i18next.t(checkEngineLightOn ? "checkEngineLightOn" : "checkEngineLightOff"), "info");
  log(i18next.t("confirmedEmissionsRelatedDtcs", { numberOfConfirmedEmissionsRelatedDtcs }), "info");
  // TODO: Parse rest of the data

  return numberOfConfirmedEmissionsRelatedDtcs;
}

const engineCoolantTemperatureResponses = ["0105", "41 05 4E \r", "\r>"];

function parseEngineCoolantTemperature(value) {
  if (!value.startsWith("41 05")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = unsignedIntFromBytes(temperatureByte) - 40;

  log(i18next.t("engineCoolantTemperatureValue", { temperatureValue: temperatureValue }), "info");

  return temperatureValue;
}

const vinResponses = [
  "0902",
  "49 02 01 00 00 00 57 \r",
  "49 02 02 30 4C 30 58 \r",
  "49 02 03 43 45 37 35 \r",
  "49 02 04 38 34 33 31 \r",
  "\r>",
];

let vinBuffer = [];

function parseVINResponse(value) {
  if (value === "0902") {
    return;
  }

  if (value && value !== ">") {
    vinBuffer.push(value);
    return;
  }

  const separateBytes = vinBuffer.map((line) => line.split(" "));
  const dataBytesWithoutPrefix = separateBytes.map((bytes) => bytes.slice(3));
  const dataBytesWithLeftPadding = dataBytesWithoutPrefix.flat();
  const indexOfFirstMeaningfulByte = dataBytesWithLeftPadding.findIndex((byte) => byte !== "00");
  const dataBytes = dataBytesWithLeftPadding.slice(indexOfFirstMeaningfulByte);

  const vinString = dataBytes.map((byte) => String.fromCharCode(parseInt(byte, 16))).join("");

  log(i18next.t("vehicleVin", { vinString: vinString }), "info");

  vinBuffer = [];
  return vinString;
}

function parseCalculatedEngineLoadResponse(value) {
  if (!value.startsWith("41 04")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const engineLoadByte = separateBytes[2];
  const engineLoadValue = unsignedIntFromBytes(engineLoadByte) / 2.55;

  log(i18next.t("engineLoad", { engineLoadValue: engineLoadValue.toFixed(2) }), "info");

  return engineLoadValue;
}

function parseEngineOilTemperature(value) {
  if (!value.startsWith("41 5C")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = unsignedIntFromBytes(temperatureByte) - 40;

  log(i18next.t("engineOilTemperatureValue", { temperatureValue }), "info");

  return temperatureValue;
}

function parseEngineSpeed(value) {
  if (!value.startsWith("41 0C")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const rpmByteA = separateBytes[2];
  const rpmByteB = separateBytes[3];
  const rpmValue = unsignedIntFromBytes([rpmByteA, rpmByteB]) / 4;

  log(i18next.t("engineRpmValue", { rpmValue }), "info");

  return rpmValue;
}

function parseVehicleSpeed(value) {
  if (!value.startsWith("41 0D")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const speedByte = separateBytes[2];
  const speedValue = unsignedIntFromBytes(speedByte);

  log(i18next.t("vehicleSpeed", { speedValue: speedValue }), "info");

  return speedValue;
}

function parseIntakeAirTemperature(value) {
  if (!value.startsWith("41 0F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = unsignedIntFromBytes(temperatureByte) - 40;

  log(i18next.t("airIntakeTemperatureValue", { temperatureValue: temperatureValue }), "info");

  return temperatureValue;
}

function parseMassAirFlowSensorValue(value) {
  if (!value.startsWith("41 10")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const massAirFlowA = separateBytes[2];
  const massAirFlowB = separateBytes[3];
  const massAirFlowValue = unsignedIntFromBytes([massAirFlowA, massAirFlowB]) / 100;

  log(i18next.t("massAirFlow", { massAirFlowValue: massAirFlowValue.toFixed(2) }), "info");

  return massAirFlowValue;
}

function parseFuelTankLevel(value) {
  if (!value.startsWith("41 2F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const fuelTankLevelByte = separateBytes[2];
  const fuelTankLevelValue = (100 / 255) * unsignedIntFromBytes(fuelTankLevelByte);

  log(i18next.t("fuelTankLevel", { fuelTankLevelValue: fuelTankLevelValue.toFixed(2) }), "info");

  return fuelTankLevelValue;
}

function parseControlModuleVoltage(value) {
  if (!value.startsWith("41 42")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const voltageByteA = separateBytes[2];
  const voltageByteB = separateBytes[3];
  const voltageValue = unsignedIntFromBytes([voltageByteA, voltageByteB]) / 1000;

  log(i18next.t("ecuVoltageValue", { voltageValue: voltageValue.toFixed(2) }), "info");

  return voltageValue;
}

function parseEngineFuelRate(value) {
  if (!value.startsWith("41 5E")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const rateByteA = separateBytes[2];
  const rateByteB = separateBytes[3];
  const rateValue = unsignedIntFromBytes([rateByteA, rateByteB]) / 20;

  log(i18next.t("fuelConsumptionRate", { rateValue: rateValue.toFixed(2) }), "info");

  return rateValue;
}

function parseBmsInfoBuffer(buffer) {
  const joinedBuffer = buffer.replaceAll("\n", "").replaceAll("\r", "");

  const numberedPackets = Array.from(joinedBuffer.matchAll(/\d\:(\s[0-9A-F][0-9A-F]){6,7}/gm).map((match) => match[0]));

  const packets = numberedPackets.map((packet) => packet.split(":")[1].trim().split(" "));

  return packets;
}

const sampleParseHkmcEvBmsInfo01 =
  "7F 22 12 \r7F 22 12 \r03E \r0: 62 01 01 FF F7 E7 \r7F 22 121: FF 88 35 93 3E 1C 83 \r2: 00 28 0E D4 05 04 043: 04 04 04 00 00 03 C14: 03 C1 36 00 00 92 005: 06 C0 E4 00 06 A2 CE6: 00 02 8E 5C 00 02 717: 1F 01 35 B3 3E 0D 018: 7C 00 00 00 00 03 E8>";

function parseHkmcEvBmsInfo01(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const socBms = unsignedIntFromBytes(separatePacketBytes[1][1]) / 2;
  const maxRegenerationPower = unsignedIntFromBytes(separatePacketBytes[1].slice(2, 4)) / 100;
  const maxPower = unsignedIntFromBytes(separatePacketBytes[1].slice(4, 6)) / 100;
  const batteryCurrent = signedIntFromBytes(separatePacketBytes[2].slice(0, 2)) / 10;
  const batteryVoltage = unsignedIntFromBytes(separatePacketBytes[2].slice(2, 4)) / 10;

  const batteryMaxTemp = signedIntFromBytes(separatePacketBytes[2][4]);
  const batteryMinTemp = signedIntFromBytes(separatePacketBytes[2][5]);
  const batteryTemp1 = signedIntFromBytes(separatePacketBytes[2][6]);
  const batteryTemp2 = signedIntFromBytes(separatePacketBytes[3][0]);
  const batteryTemp3 = signedIntFromBytes(separatePacketBytes[3][1]);
  const batteryTemp4 = signedIntFromBytes(separatePacketBytes[3][2]);

  const batteryInletTemp = signedIntFromBytes(separatePacketBytes[3][5]);
  const batteryMaxCellVoltage = unsignedIntFromBytes(separatePacketBytes[3][6]) / 50;
  const batteryMaxCellVoltageNo = unsignedIntFromBytes(separatePacketBytes[4][0]);
  const batteryMinCellVoltage = unsignedIntFromBytes(separatePacketBytes[4][1]) / 50;
  const batteryMinCellVoltageNo = unsignedIntFromBytes(separatePacketBytes[4][2]);

  const batteryFanMod = unsignedIntFromBytes(separatePacketBytes[4][3]);
  const batteryFanSpeed = unsignedIntFromBytes(separatePacketBytes[4][4]);

  const auxBatteryVoltage = unsignedIntFromBytes(separatePacketBytes[4][5]) / 10;

  const cumulativeCapacityCharged =
    unsignedIntFromBytes([separatePacketBytes[4][6], ...separatePacketBytes[5].slice(0, 3)]) / 10;

  const cumulativeCapacityDischarged = unsignedIntFromBytes(separatePacketBytes[5].slice(3, 7)) / 10;

  const cumulativeEnergyCharged = unsignedIntFromBytes(separatePacketBytes[6].slice(0, 4)) / 10;
  const cumulativeEnergyDischarged =
    unsignedIntFromBytes([...separatePacketBytes[6].slice(4, 7), separatePacketBytes[7][0]]) / 10;

  const averageBatteryVoltageWhileCharge = cumulativeEnergyCharged / cumulativeCapacityCharged;
  const averageBatteryVoltageWhileDischarge = cumulativeEnergyDischarged / cumulativeCapacityDischarged;

  const operationalTimeSeconds = unsignedIntFromBytes(separatePacketBytes[7].slice(1, 5));
  const operationalTimeHours = operationalTimeSeconds / 60 / 60;

  const bmsIgnition = unsignedIntFromBytes(separatePacketBytes[7][5]).toString(2);
  const bmsCapacitorVoltage = unsignedIntFromBytes([separatePacketBytes[7][6], separatePacketBytes[8][0]]);

  const motorRpm1 = unsignedIntFromBytes(separatePacketBytes[8].slice(1, 3));
  const motorRpm2 = unsignedIntFromBytes(separatePacketBytes[8].slice(3, 5));

  const surgeResistorKOhm = unsignedIntFromBytes(separatePacketBytes[8].slice(5, 7));

  const batteryPower = batteryCurrent * batteryVoltage;

  log(i18next.t("bmsInfo1"), "info");
  log(i18next.t("bmsInfoSoc", { socValue: socBms }), "info");
  log(i18next.t("bmsInfoMaxRegen", { maxRegenerationPower }), "info");
  log(i18next.t("bmsInfoMaxPower", { maxPower }), "info");
  log(i18next.t("bmsInfoBatteryMaxT", { batteryMaxT: batteryMaxTemp }), "info");
  log(i18next.t("bmsInfoBatteryMinT", { batteryMinT: batteryMinTemp }), "info");
  log(i18next.t("bmsInfoBatteryModuleTemp", { moduleNumber: 1, batteryModuleTemp: batteryTemp1 }), "info");
  log(i18next.t("bmsInfoBatteryModuleTemp", { moduleNumber: 2, batteryModuleTemp: batteryTemp2 }), "info");
  log(i18next.t("bmsInfoBatteryModuleTemp", { moduleNumber: 3, batteryModuleTemp: batteryTemp3 }), "info");
  log(i18next.t("bmsInfoBatteryModuleTemp", { moduleNumber: 4, batteryModuleTemp: batteryTemp4 }), "info");
  log(i18next.t("bmsInfoBatteryInletT", { batteryInletT: batteryInletTemp }), "info");
  log(i18next.t("bmsInfoMinCellVoltage", { minCellVoltageValue: batteryMinCellVoltage }), "info");
  log(i18next.t("bmsInfoMaxCellVoltage", { maxCellVoltageValue: batteryMaxCellVoltage }), "info");
  log(
    batteryPower > 0
      ? i18next.t("bmsInfoDischargePower", { dischargePowerValue: (Math.abs(batteryPower) / 1000).toFixed(2) })
      : i18next.t("bmsInfoChargePower", { chargePowerValue: (Math.abs(batteryPower) / 1000).toFixed(2) }),
    "info"
  );
  log(
    batteryCurrent > 0
      ? i18next.t("bmsInfoDischargeCurrent", { dischargeCurrentValue: batteryCurrent })
      : i18next.t("bmsInfoChargeCurrent", { chargeCurrentValue: batteryCurrent }),
    "info"
  );
  log(i18next.t("bmsInfoBatteryVoltage", { batteryVoltageValue: batteryVoltage }), "info");
  log(i18next.t("bmsInfoBatteryAuxBatteryVoltage", { battery12VVoltage: auxBatteryVoltage }), "info");

  log(i18next.t("bmsInfoCumulativeCapacityCharged", { cumulativeCapacityCharged }), "info");
  log(i18next.t("bmsInfoCumulativeCapacityDischarged", { cumulativeCapacityDischarged }), "info");
  log(i18next.t("bmsInfoCumulativeEnergyCharged", { cumulativeEnergyCharged }), "info");
  log(i18next.t("bmsInfoCumulativeEnergyDischarged", { cumulativeEnergyDischarged }), "info");

  log(
    i18next.t("bmsInfoOperationalTimeSeconds", { operationalTimeSeconds: operationalTimeSeconds.toFixed(0) }),
    "info"
  );
  log(i18next.t("bmsInfoOperationalTimeHours", { operationalTimeHours: operationalTimeHours.toFixed(0) }), "info");

  return {
    socBms,
    maxRegenerationPower,
    maxPower,
    batteryCurrent,
    batteryVoltage,
    batteryMaxTemp,
    batteryMinTemp,
    batteryTemp1,
    batteryTemp2,
    batteryTemp3,
    batteryTemp4,
    batteryInletTemp,
    batteryMaxCellVoltage,
    batteryMaxCellVoltageNo,
    batteryMinCellVoltage,
    batteryMinCellVoltageNo,
    batteryFanMod,
    batteryFanSpeed,
    auxBatteryVoltage,
    cumulativeCapacityCharged,
    cumulativeCapacityDischarged,
    cumulativeEnergyCharged,
    cumulativeEnergyDischarged,
    averageBatteryVoltageWhileCharge,
    averageBatteryVoltageWhileDischarge,
    operationalTimeSeconds,
    operationalTimeHours,
    bmsIgnition,
    bmsCapacitorVoltage,
    motorRpm1,
    motorRpm2,
    surgeResistorKOhm,
  };
}

const sampleParseHkmcEvBmsInfo02 = `7F 22 12 
7F 22 12 
7F 22 12 
027 
0: 62 01 02 FF FF FF 
1: FF C7 C7 C7 C7 C7 C7
2: C7 C7 C7 C7 C7 C7 C7
3: C7 C7 C7 C7 C7 C7 C7
4: C7 C7 C7 C7 C7 C7 C7
5: C7 C7 C7 C7 C7 AA AA
>`;

function parseHkmcEvBmsInfo02(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const cellVoltages = [];

  for (let rowIndex = 1; rowIndex <= 5; rowIndex++) {
    const minColumnIndex = rowIndex === 1 ? 1 : 0;
    const maxColumnIndex = rowIndex === 5 ? 4 : 6;

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
      const cellVoltage = unsignedIntFromBytes(separatePacketBytes[rowIndex][columnIndex]) / 50;
      cellVoltages.push(cellVoltage);
    }
  }

  const [
    cellVoltage01,
    cellVoltage02,
    cellVoltage03,
    cellVoltage04,
    cellVoltage05,
    cellVoltage06,
    cellVoltage07,
    cellVoltage08,
    cellVoltage09,
    cellVoltage10,
    cellVoltage11,
    cellVoltage12,
    cellVoltage13,
    cellVoltage14,
    cellVoltage15,
    cellVoltage16,
    cellVoltage17,
    cellVoltage18,
    cellVoltage19,
    cellVoltage20,
    cellVoltage21,
    cellVoltage22,
    cellVoltage23,
    cellVoltage24,
    cellVoltage25,
    cellVoltage26,
    cellVoltage27,
    cellVoltage28,
    cellVoltage29,
    cellVoltage30,
    cellVoltage31,
    cellVoltage32,
  ] = cellVoltages;

  for (let index = 0; index < 32; index++) {
    log(
      i18next.t("cellVoltage", {
        cellNumber: (index + 1).toString().padStart(2, "0"),
        cellVoltage: cellVoltages[index],
      }),
      "info"
    );
  }

  return {
    cellVoltage01,
    cellVoltage02,
    cellVoltage03,
    cellVoltage04,
    cellVoltage05,
    cellVoltage06,
    cellVoltage07,
    cellVoltage08,
    cellVoltage09,
    cellVoltage10,
    cellVoltage11,
    cellVoltage12,
    cellVoltage13,
    cellVoltage14,
    cellVoltage15,
    cellVoltage16,
    cellVoltage17,
    cellVoltage18,
    cellVoltage19,
    cellVoltage20,
    cellVoltage21,
    cellVoltage22,
    cellVoltage23,
    cellVoltage24,
    cellVoltage25,
    cellVoltage26,
    cellVoltage27,
    cellVoltage28,
    cellVoltage29,
    cellVoltage30,
    cellVoltage31,
    cellVoltage32,
  };
}

const sampleParseHkmcEvBmsInfo03 = `7F 22 12 
7F 22 12 
7F 22 12 
027 
0: 62 01 03 FF FF FF 
1: FF C7 C7 C7 C7 C7 C7
2: C7 C7 C7 C7 C7 C7 C7
3: C7 C7 C7 C7 C7 C7 C7
4: C7 C7 C7 C7 C7 C7 C7
5: C7 C7 C7 C7 C7 AA AA
>`;

function parseHkmcEvBmsInfo03(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const cellVoltages = [];

  for (let rowIndex = 1; rowIndex <= 5; rowIndex++) {
    const minColumnIndex = rowIndex === 1 ? 1 : 0;
    const maxColumnIndex = rowIndex === 5 ? 4 : 6;

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
      const cellVoltage = unsignedIntFromBytes(separatePacketBytes[rowIndex][columnIndex]) / 50;
      cellVoltages.push(cellVoltage);
    }
  }

  const [
    cellVoltage33,
    cellVoltage34,
    cellVoltage35,
    cellVoltage36,
    cellVoltage37,
    cellVoltage38,
    cellVoltage39,
    cellVoltage40,
    cellVoltage41,
    cellVoltage42,
    cellVoltage43,
    cellVoltage44,
    cellVoltage45,
    cellVoltage46,
    cellVoltage47,
    cellVoltage48,
    cellVoltage49,
    cellVoltage50,
    cellVoltage51,
    cellVoltage52,
    cellVoltage53,
    cellVoltage54,
    cellVoltage55,
    cellVoltage56,
    cellVoltage57,
    cellVoltage58,
    cellVoltage59,
    cellVoltage60,
    cellVoltage61,
    cellVoltage62,
    cellVoltage63,
    cellVoltage64,
  ] = cellVoltages;

  for (let index = 0; index < 32; index++) {
    log(
      i18next.t("cellVoltage", {
        cellNumber: (index + 33).toString().padStart(2, "0"),
        cellVoltage: cellVoltages[index],
      }),
      "info"
    );
  }

  return {
    cellVoltage33,
    cellVoltage34,
    cellVoltage35,
    cellVoltage36,
    cellVoltage37,
    cellVoltage38,
    cellVoltage39,
    cellVoltage40,
    cellVoltage41,
    cellVoltage42,
    cellVoltage43,
    cellVoltage44,
    cellVoltage45,
    cellVoltage46,
    cellVoltage47,
    cellVoltage48,
    cellVoltage49,
    cellVoltage50,
    cellVoltage51,
    cellVoltage52,
    cellVoltage53,
    cellVoltage54,
    cellVoltage55,
    cellVoltage56,
    cellVoltage57,
    cellVoltage58,
    cellVoltage59,
    cellVoltage60,
    cellVoltage61,
    cellVoltage62,
    cellVoltage63,
    cellVoltage64,
  };
}

const sampleParseHkmcEvBmsInfo04 = `7F 22 12 
7F 22 12 
7F 22 12 
027 
0: 62 01 04 FF FF FF
1: FF C7 C7 C7 C7 C7 C7
2: C7 C7 C7 C7 C7 C7 C7
3: C7 C7 C7 C7 C7 C7 C7
4: C7 C7 C7 C7 C7 C7 C7
5: C7 C7 C7 C7 C7 AA AA
>`;

function parseHkmcEvBmsInfo04(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const cellVoltages = [];

  for (let rowIndex = 1; rowIndex <= 5; rowIndex++) {
    const minColumnIndex = rowIndex === 1 ? 1 : 0;
    const maxColumnIndex = rowIndex === 5 ? 4 : 6;

    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex++) {
      const cellVoltage = unsignedIntFromBytes(separatePacketBytes[rowIndex][columnIndex]) / 50;
      cellVoltages.push(cellVoltage);
    }
  }

  const [
    cellVoltage65,
    cellVoltage66,
    cellVoltage67,
    cellVoltage68,
    cellVoltage69,
    cellVoltage70,
    cellVoltage71,
    cellVoltage72,
    cellVoltage73,
    cellVoltage74,
    cellVoltage75,
    cellVoltage76,
    cellVoltage77,
    cellVoltage78,
    cellVoltage79,
    cellVoltage80,
    cellVoltage81,
    cellVoltage82,
    cellVoltage83,
    cellVoltage84,
    cellVoltage85,
    cellVoltage86,
    cellVoltage87,
    cellVoltage88,
    cellVoltage89,
    cellVoltage90,
    cellVoltage91,
    cellVoltage92,
    cellVoltage93,
    cellVoltage94,
    cellVoltage95,
    cellVoltage96,
  ] = cellVoltages;

  for (let index = 0; index < 32; index++) {
    log(
      i18next.t("cellVoltage", {
        cellNumber: (index + 65).toString().padStart(2, "0"),
        cellVoltage: cellVoltages[index],
      }),
      "info"
    );
  }

  return {
    cellVoltage65,
    cellVoltage66,
    cellVoltage67,
    cellVoltage68,
    cellVoltage69,
    cellVoltage70,
    cellVoltage71,
    cellVoltage72,
    cellVoltage73,
    cellVoltage74,
    cellVoltage75,
    cellVoltage76,
    cellVoltage77,
    cellVoltage78,
    cellVoltage79,
    cellVoltage80,
    cellVoltage81,
    cellVoltage82,
    cellVoltage83,
    cellVoltage84,
    cellVoltage85,
    cellVoltage86,
    cellVoltage87,
    cellVoltage88,
    cellVoltage89,
    cellVoltage90,
    cellVoltage91,
    cellVoltage92,
    cellVoltage93,
    cellVoltage94,
    cellVoltage95,
    cellVoltage96,
  };
}

const sampleParseHkmcEvBmsInfo05 =
  "7F 22 12 \r7F 22 12 \r02E \r0: 62 01 05 00 3F FF \r7F 22 12 \r1: 90 00 00 00 00 00 002: 00 00 00 00 00 00 35 \r3: A5 3E 1C 00 01 50 034: 00 03 E8 47 03 E8 365: 8C 00 00 C1 C1 00 006: 05 00 00 00 00 AA AA>";

function parseHkmcEvBmsInfo05(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const unknownTempA = signedIntFromBytes(separatePacketBytes[2][2]);
  const cellVoltageDifference = unsignedIntFromBytes(separatePacketBytes[3][3]) / 50;

  const airbagValue = unsignedIntFromBytes(separatePacketBytes[3][5]).toString(2);

  const heaterTemp = signedIntFromBytes(separatePacketBytes[3][6]);

  const soh = unsignedIntFromBytes(separatePacketBytes[4].slice(1, 3)) / 10;

  const maxDeterioratedCellNo = unsignedIntFromBytes(separatePacketBytes[4][3]);

  const minDeteriorationPercentage = unsignedIntFromBytes(separatePacketBytes[4][4]) / 10;

  const minDeterioratedCellNo = unsignedIntFromBytes(separatePacketBytes[4][3]);

  const socDisplay = unsignedIntFromBytes(separatePacketBytes[5][0]) / 2;

  const cellVoltage97 = unsignedIntFromBytes(separatePacketBytes[5][3]) / 50;
  const cellVoltage98 = unsignedIntFromBytes(separatePacketBytes[5][4]) / 50;

  const unknownTempB = signedIntFromBytes(separatePacketBytes[6][0]);

  // log(i18next.t("bmsInfo5"), "info");

  const cellVoltages = [cellVoltage97, cellVoltage98];

  for (let index = 0; index < 2; index++) {
    log(
      i18next.t("cellVoltage", {
        cellNumber: (index + 97).toString().padStart(2, "0"),
        cellVoltage: cellVoltages[index],
      }),
      "info"
    );
  }

  log(i18next.t("bmsSoh", { sohValue: soh }), "info");
  log(i18next.t("bmsHeaterTemp", { heaterTemp: heaterTemp }), "info");
  log(i18next.t("bmsSocDisplay", { socDisplay }), "info");

  return {
    unknownTempA,
    cellVoltageDifference,
    airbagValue,
    heaterTemp,
    soh,
    maxDeterioratedCellNo,
    minDeteriorationPercentage,
    minDeterioratedCellNo,
    socDisplay,
    cellVoltage97,
    cellVoltage98,
    unknownTempB,
  };
}

const sampleParseHkmcEvBmsInfo06 = `7F 22 12 
7F 22 12 
027 
0: 62 01 06 FF FF FF 
7F 22 12 
1: FF 15 00 15 00 30 7C 
2: 7C 00 31 7C 81 00 00 
3: B4 B3 00 0B 28 00 00
4: 00 00 00 00 00 00 00 
5: 00 00 00 00 00 AA AA
>`;

function parseHkmcEvBmsInfo06(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const coolingWaterTemp = signedIntFromBytes(separatePacketBytes[1][1]);
  const unknownTempC = signedIntFromBytes(separatePacketBytes[1][3]);
  const bmsMode = unsignedIntFromBytes(separatePacketBytes[2][4]).toString(2);
  const unknownTempD = signedIntFromBytes(separatePacketBytes[3][3]);

  log(i18next.t("bmsCoolingWaterTemp", { coolingWaterTemp }), "info");
  log(i18next.t("bmsUnknownTempC", { unknownTempC }), "info");
  log(i18next.t("bmsMode", { bmsMode }), "info");
  log(i18next.t("bmsUnknownTempD", { unknownTempD }), "info");

  return {
    coolingWaterTemp,
    unknownTempC,
    bmsMode,
    unknownTempD,
  };
}

const sampleParseHkmcEvClusterInfo02 = `00F 
0: 62 B0 02 E0 00 00
1: 00 FF B5 01 48 D9 00
2: 00 00 00 00 00 00 00
>`;

function parseHkmcEvClusterInfo02(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const odometerKm = unsignedIntFromBytes(separatePacketBytes[1].slice(3, 6));

  log(i18next.t("hkmcEvClusterInfo02"), "info");
  log(i18next.t("mileageKm", { odometerKm }), "info");

  return {
    odometerKm,
  };
}

const sampleHkmcEvAbsInfo01 = `02A 
0: 62 C1 01 5F D7 E7 
1: D0 FF FF 00 FF 01 E1 
2: D4 00 00 00 00 FF 82 
3: FF 00 34 F5 01 00 00 
4: FF FF 7F 17 08 01 07 
5: FC 44 FF 39 FF 3F FF
6: FF AA AA AA AA AA AA
>`;

function parseHkmcEvAbsInfo01(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const steeringWheelAngle = (unsignedIntFromBytes(separatePacketBytes[4].slice(2, 4)) - 2 ** 15) / 10;

  const brakePedalPositionRelative = unsignedIntFromBytes(separatePacketBytes[5][1]);

  log(i18next.t("hkmcEvAbsInfo01"), "info");
  log(i18next.t("steeringWheelAngle", { steeringWheelAngle: steeringWheelAngle.toFixed(1) }), "info");
  log(
    i18next.t("brakePedalPositionRelative", { brakePedalPositionRelative: brakePedalPositionRelative.toFixed(2) }),
    "info"
  );

  return {
    steeringWheelAngle,
    brakePedalPositionRelative,
  };
}

const sampleHkmcEvVmcuInfo01 = `018 
0: 61 01 FF F8 00 00
1: 09 21 5A FC 0A 89 05
2: 32 1D 00 00 99 72 34
3: 04 20 20 05 00 00 00
>`;

function parseHkmcEvVmcuInfo01(value) {
  const separatePacketBytes = parseBmsInfoBuffer(value);

  const acceleratorPedalPositionRelative = unsignedIntFromBytes(separatePacketBytes[2][1]) / 2;

  const vehicleSpeed = unsignedIntFromBytes(separatePacketBytes[2].slice(2, 4)) / 100;

  log(i18next.t("hkmcEvVmcuInfo01"), "info");
  log(
    i18next.t("acceleratorPedalPositionRelative", {
      acceleratorPedalPositionRelative: acceleratorPedalPositionRelative.toFixed(2),
    }),
    "info"
  );
  log(i18next.t("hkmcVehicleSpeed", { vehicleSpeed: vehicleSpeed.toFixed(2) }), "info");

  return {
    acceleratorPedalPositionRelative,
    vehicleSpeed,
  };
}
