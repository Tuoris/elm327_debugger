let CONFIGS = [];

const logsContainer = document.querySelector("#logs");

function log(string, level = "debug") {
  const newLogLine = document.createElement("code");
  newLogLine.textContent = `${new Date().toISOString()}: ${string}`;
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
          hyundaiKonaBmsInfo1: "Hyundai Kona інформація з BMS #1",
          hyundaiKonaBmsInfo5: "Hyundai Kona інформація з BMS #5",
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
            "Помилка при отриманні інформації з BMS #1 Hyundai Kona - неправильна кількість пакетів: {{separatePacketBytesLength}}.",
          bmsInfo1: "Інформація з BMS #1 Hyundai Kona:",
          bmsInfoSoc: "- рівень заряду: {{socValue}} %",
          bmsInfoMaxRegen: "- доступна потужність рекуперації: {{maxRegenValue}} кВт",
          bmsInfoMaxPower: "- доступна потужність: {{maxPowerValue}} кВт",
          bmsInfoBatteryMaxT: "- температура акумулятора (макс.): {{batteryMaxT}} °C",
          bmsInfoBatteryMinT: "- температура акумулятора (мін.): {{batteryMinT}} °C",
          bmsInfoMinCellVoltage: "- мінімальна напруга комірки: {{minCellVoltageValue}} В",
          bmsInfoMaxCellVoltage: "- максимальна напруга комірки: {{maxCellVoltageValue}} В",
          bmsInfoDischargePower: "- потужність розряджання акумулятора: {{dischargePowerValue}} кВт",
          bmsInfoChargePower: "- потужність заряджання акумулятора: {{chargePowerValue}} кВт",
          bmsInfoDischargeCurrent: "- струм батареї: {{dischargeCurrentValue}} А - розряджання",
          bmsInfoChargeCurrent: "- струм батареї: {{chargeCurrentValue}} А - заряджання",
          bmsInfoBatteryVoltage: "- напруга батареї: {{batteryVoltageValue}} В",
          bmsInfoBattery12VVoltage: "- напруга 12В батареї: {{battery12VVoltage}} В",
          bmsInfo5: "Інформація з BMS #5 Hyundai Kona:",
          bmsSoh: "- здоров'я акумулятора (SOH): {{sohValue}} %",
          bmsHeaterTemp: "- температура обігрівача акумулятора: {{heaterTemp}} °C",
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
          hyundaiKonaBmsInfo1: "Hyundai Kona BMS info #1",
          hyundaiKonaBmsInfo5: "Hyundai Kona BMS info #5",
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
            "Error retrieving information from BMS #1 Hyundai Kona - incorrect number of packets: {{separatePacketBytesLength}}.",
          bmsInfo1: "BMS info #1 Hyundai Kona:",
          bmsInfoSoc: "- state of charge: {{socValue}} %",
          bmsInfoMaxRegen: "- available regenerative power: {{maxRegenValue}} kW",
          bmsInfoMaxPower: "- available power: {{maxPowerValue}} kW",
          bmsInfoBatteryMaxT: "- battery temperature (max.): {{batteryMaxT}} °C",
          bmsInfoBatteryMinT: "- battery temperature (min.): {{batteryMinT}} °C",
          bmsInfoMinCellVoltage: "- minimum cell voltage: {{minCellVoltageValue}} V",
          bmsInfoMaxCellVoltage: "- maximum cell voltage: {{maxCellVoltageValue}} V",
          bmsInfoDischargePower: "- battery discharge power: {{dischargePowerValue}} kW",
          bmsInfoChargePower: "- battery charge power: {{chargePowerValue}} kW",
          bmsInfoDischargeCurrent: "- battery current: {{dischargeCurrentValue}} A - discharging",
          bmsInfoChargeCurrent: "- battery current: {{chargeCurrentValue}} A - charging",
          bmsInfoBatteryVoltage: "- battery voltage: {{batteryVoltageValue}} V",
          bmsInfoBattery12VVoltage: "- 12V battery voltage: {{battery12VVoltage}} V",
          bmsInfo5: "BMS info #5 Hyundai Kona:",
          bmsSoh: "- battery state of health (SOH): {{sohValue}} %",
          bmsHeaterTemp: "- battery heater temperature: {{heaterTemp}} °C",
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
      [COMMANDS.HYUNDAI_KONA_BMS_INFO_01]: i18next.t("hyundaiKonaBmsInfo1"),
      [COMMANDS.HYUNDAI_KONA_BMS_INFO_05]: i18next.t("hyundaiKonaBmsInfo5"),
    };

    const commandsContainer = document.querySelector("#commands");
    commandsContainer.innerHTML = "";
    for (const command of Object.values(COMMANDS)) {
      const commandButton = document.createElement("button");
      commandButton.addEventListener("click", () => sendData(command));
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

function receiveValue(rawValue) {
  const rawBytes = Array.from(new Int8Array(rawValue.buffer)).map((n) => n.toString(16).padStart(2, "0"));
  console.log(`Raw bytes: ${rawBytes.join(" ")}`);
  const value = new TextDecoder().decode(rawValue).trim();
  log(i18next.t("valueReceived", { value, interpolation: { escapeValue: false } }));

  receiveBuffer += value;

  if (value.includes(">")) {
    console.timeEnd(currentCommand);
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

  console.time(`${data.trim()}`);

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
    writeCharacteristic.writeValue(new TextEncoder().encode(data + "\r"));
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
  HYUNDAI_KONA_BMS_INFO_01: "220101",
  HYUNDAI_KONA_BMS_INFO_05: "220105",
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
  [COMMANDS.HYUNDAI_KONA_BMS_INFO_01]: parseHyundaiKonaBmsInfo01,
  [COMMANDS.HYUNDAI_KONA_BMS_INFO_05]: parseHyundaiKonaBmsInfo05,
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
  const joinedBuffer = buffer.join("").replaceAll("\n", "");

  const numberedPackets = Array.from(joinedBuffer.matchAll(/\d\:(\s[0-9A-F][0-9A-F]){7}/gm).map((match) => match[0]));

  const packets = numberedPackets.map((packet) => packet.split(":")[1].trim().split(" "));

  return packets;
}

let bmsInfoBuffer01 = [];
function parseHyundaiKonaBmsInfo01(value) {
  if (value.includes(">")) {
    const separatePacketBytes = parseBmsInfoBuffer(bmsInfoBuffer01);

    console.table(separatePacketBytes);

    if (separatePacketBytes.length !== 8) {
      bmsInfoBuffer01 = [];
      log(i18next.t("bmsInfoError", { separatePacketBytesLength: separatePacketBytes.length }));
      return "<parseKiaNiroBmsInfo error>";
    }

    console.table(separatePacketBytes);

    const batteryCurrentValue = signedIntFromBytes(separatePacketBytes[1].slice(0, 2)) / 10;
    const batteryVoltageValue = signedIntFromBytes(separatePacketBytes[1].slice(2, 4)) / 10;
    const batteryPower = batteryCurrentValue * batteryVoltageValue;

    const battery12VVoltage = unsignedIntFromBytes(separatePacketBytes[3][5]) / 10;

    const socValue = unsignedIntFromBytes(separatePacketBytes[0][1]) / 2;

    const maxRegenValue = unsignedIntFromBytes(separatePacketBytes[0].slice(2, 4)) / 100;

    const maxPowerValue = unsignedIntFromBytes(separatePacketBytes[0].slice(4, 6)) / 100;

    const batteryMaxT = signedIntFromBytes(separatePacketBytes[1][4]);
    const batteryMinT = signedIntFromBytes(separatePacketBytes[1][5]);

    const maxCellVoltageValue = (unsignedIntFromBytes(separatePacketBytes[2][6]) * 2) / 100;
    const minCellVoltageValue = (unsignedIntFromBytes(separatePacketBytes[3][1]) * 2) / 100;

    log(i18next.t("bmsInfo1"), "info");
    log(i18next.t("bmsInfoSoc", { socValue: socValue }), "info");
    log(i18next.t("bmsInfoMaxRegen", { maxRegenValue: maxRegenValue }), "info");
    log(i18next.t("bmsInfoMaxPower", { maxPowerValue: maxPowerValue }), "info");
    log(i18next.t("bmsInfoBatteryMaxT", { batteryMaxT: batteryMaxT }), "info");
    log(i18next.t("bmsInfoBatteryMinT", { batteryMinT: batteryMinT }), "info");
    log(i18next.t("bmsInfoMinCellVoltage", { minCellVoltageValue: minCellVoltageValue }), "info");
    log(i18next.t("bmsInfoMaxCellVoltage", { maxCellVoltageValue: maxCellVoltageValue }), "info");
    log(
      batteryPower > 0
        ? i18next.t("bmsInfoDischargePower", { dischargePowerValue: Math.abs(batteryPower) / 1000 })
        : i18next.t("bmsInfoChargePower", { chargePowerValue: Math.abs(batteryPower) / 1000 }),
      "info"
    );
    log(
      batteryCurrentValue > 0
        ? i18next.t("bmsInfoDischargeCurrent", { dischargeCurrentValue: batteryCurrentValue })
        : i18next.t("bmsInfoChargeCurrent", { chargeCurrentValue: batteryCurrentValue }),
      "info"
    );
    log(i18next.t("bmsInfoBatteryVoltage", { batteryVoltageValue: batteryVoltageValue }), "info");
    log(i18next.t("bmsInfoBattery12VVoltage", { battery12VVoltage: battery12VVoltage }), "info");

    bmsInfoBuffer01 = [];
  }

  bmsInfoBuffer01.push(value);
}

let bmsInfoBuffer05 = [];
function parseHyundaiKonaBmsInfo05(value) {
  console.log(bmsInfoBuffer05);
  if (value.includes(">")) {
    const separatePacketBytes = parseBmsInfoBuffer(bmsInfoBuffer05);

    const heaterTemp = signedIntFromBytes(separatePacketBytes[2][6]);

    const sohValue = unsignedIntFromBytes([separatePacketBytes[3][1], separatePacketBytes[3][2]]) / 10;

    log(i18next.t("bmsInfo5"), "info");
    log(i18next.t("bmsSoh", { sohValue: sohValue }), "info");
    log(i18next.t("bmsHeaterTemp", { heaterTemp: heaterTemp }), "info");

    bmsInfoBuffer05 = [];
  }

  bmsInfoBuffer05.push(value);
}
