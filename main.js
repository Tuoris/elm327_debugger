const CONFIGS = [
  {
    name: "Блакитний клон ELM 327",
    serviceUuid: "0000fff0-0000-1000-8000-00805f9b34fb",
    characteristicUuid: 0xfff1,
  },
  {
    name: "Vgate iCar2 Bluetooth 4.0",
    serviceUuid: "e7810a71-73ae-499d-8c15-faa9aef0c3f2",
    characteristicUuid: "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f",
  },
];

const logsContainer = document.querySelector("#logs");

function log(string, level = "debug") {
  const newLogLine = document.createElement("code");
  newLogLine.textContent = `${new Date().toISOString()}: ${string}`;
  newLogLine.classList.add("log");
  newLogLine.classList.add(level);
  logsContainer.appendChild(newLogLine);
  newLogLine.scrollIntoView();
}

log(`Натисніть кнопку "З'єднатись з ELM 327" для початку роботи.`, "info");

let selectedDevice = null;

async function onRequestBluetoothDeviceButtonClick() {
  log("Запит будь-якого пристрою Bluetooth, який підтримує сервіс ELM327...");

  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: CONFIGS.map((config) => config.serviceUuid),
    });

    log(`Запит пристрою: ${device.name} (${device.id})`);
    selectedDevice = device;
    connectAndSetupBluetoothScanner();
  } catch (error) {
    log(`Помилка: ${error}`, "error");
  }
}

document.querySelector("#requestDevice").addEventListener("click", onRequestBluetoothDeviceButtonClick);

let writeCharacteristic = null;
const commandSignals = {};

async function connectAndSetupBluetoothScanner() {
  if (!selectedDevice) {
    return;
  }

  const server = await selectedDevice.gatt.connect();
  log("Сервер GATT підключено.");
  log("Отримання сервісу пристрою...");

  let service;
  let serviceIndex;
  for (const [index, config] of CONFIGS.entries()) {
    try {
      service = await server.getPrimaryService(config.serviceUuid);
      serviceIndex = index;
      log("Сервіс знайдено, отримання характеристики (джерела даних)...");
    } catch {
      log(`Сервіс ${config.serviceUuid} не підтримується...`);
    }
  }

  if (!service) {
    log("Пристрій не підтримує жодного з профілів комунікації.", "error");
    return;
  }

  const characteristicUUID = CONFIGS[serviceIndex].characteristicUuid;
  const characteristic = await service.getCharacteristic(characteristicUUID);

  log(`Знайдено характеристику: ${characteristicUUID}`);
  writeCharacteristic = characteristic;

  await writeCharacteristic.startNotifications();
  log("Створення підписки на отримання відповідей.");
  writeCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
    const rawValue = event.currentTarget.value;
    receiveValue(rawValue);
  });

  await sendData("ATZ");
  await sendData("0100");

  log("Підписку створено - готовий до роботи.");
}

function receiveValue(rawValue) {
  const rawBytes = Array.from(new Int8Array(rawValue.buffer)).map((n) => n.toString(16).padStart(2, "0"));
  console.log(`Raw bytes: ${rawBytes.join(" ")}`);
  const value = new TextDecoder().decode(rawValue).trim();
  log(`Отримано: ${value}`);
  const result = parseResponse(value);
  if (result) {
    commandSignals.sendSignal.resolve(result);
  }
}

let currentCommand = "";

const sendData = (data) => {
  if (!writeCharacteristic) {
    log(`Спроба надіслати команду: ${data} - відсутнє підключення.`, "error");
    return;
  }

  commandSignals.sendSignal = new Deferred();

  if (data) {
    log(`Надсилання: ${data}`);
    writeCharacteristic.writeValue(new TextEncoder().encode(data + "\r"));
    currentCommand = data.trim();
  }

  return commandSignals.sendSignal.promise;
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
  KIA_NIRO_BMS_INFO_01: "220101",
  KIA_NIRO_BMS_INFO_05: "220105",
  KIA_NIRO_ABS_INFO: "22C101",
};

const COMMAND_LABELS = {
  [COMMANDS.VIN]: "VIN",
  [COMMANDS.MONITOR_STATUS_SINCE_DTCS_CLEARED]: "Статус моніторингу після видалення кодів несправностей",
  [COMMANDS.ENGINE_COOLANT_TEMPERATURE]: "Температура ох. рідини двигуна",
  [COMMANDS.ENGINE_OIL_TEMPERATURE]: "Температура моторної оливи",
  [COMMANDS.CALCULATED_ENGINE_LOAD]: "Розрахункове навантаження двигуна",
  [COMMANDS.ENGINE_SPEED]: "Оберти двигуна",
  [COMMANDS.VEHICLE_SPEED]: "Швидкість",
  [COMMANDS.INTAKE_AIR_TEMPERATURE]: "Температура повітря на вході",
  [COMMANDS.MASS_AIR_FLOW_SENSOR]: "Датчик масової витрати повітря",
  [COMMANDS.FUEL_TANK_LEVEL]: "Рівень палива в баку",
  [COMMANDS.CONTROL_MODULE_VOLTAGE]: "Напруга на ЕБУ",
  [COMMANDS.ENGINE_FUEL_RATE]: "Витрата пального",
  [COMMANDS.EXTENDED_TIMEOUT]: "Збільшити час відповіді",
  [COMMANDS.KIA_NIRO_BMS_INFO_01]: "Kia Niro інформація з BMS #1",
  [COMMANDS.KIA_NIRO_BMS_INFO_05]: "Kia Niro інформація з BMS #5",
  [COMMANDS.KIA_NIRO_ABS_INFO]: "Kia Niro інформація з ABS #1",
};

const commandsContainer = document.querySelector("#commands");
commandsContainer.innerHTML = "";
for (const command of Object.values(COMMANDS)) {
  const commandButton = document.createElement("button");
  commandButton.addEventListener("click", () => sendData(command));
  commandButton.innerText = `${COMMAND_LABELS[command] ?? "Unknown command"} (${command})`;

  commandsContainer.appendChild(commandButton);
}

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
  [COMMANDS.KIA_NIRO_BMS_INFO_01]: parseKiaNiroBmsInfo01,
  [COMMANDS.KIA_NIRO_BMS_INFO_05]: parseKiaNiroBmsInfo05,
  [COMMANDS.KIA_NIRO_ABS_INFO]: parseKiaNiroAbsInfo,
};

function parseResponse(value) {
  const handler = handlers[currentCommand];
  if (handler) {
    return handler(value);
  }

  return defaultHandler(value);
}

function defaultHandler(value) {
  if (value.includes(">")) {
    return true;
  }
}

function parseMonitorStatusSinceDtcsCleared(value) {
  if (!value.startsWith("41 01")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const byteA = separateBytes[2];
  const byteABits = unsignedIntFromBytes(byteA).toString(2);
  const checkEngineLightOn = byteABits[0] === "1";
  const numberOfConfirmedEmissionsRelatedDtcs = parseInt(byteABits.slice(1), 2);

  log(`Лампа "Check Engine" ${checkEngineLightOn ? "горить" : "не горить"}.`, "info");
  log(
    `Кількість підтверджених DTC, пов'язаних з викидами:
${numberOfConfirmedEmissionsRelatedDtcs}`,
    "info"
  );
  // TODO: Parse rest oof the data

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

  log(`Температура охолоджувальної рідини двигуна: ${temperatureValue} °C`, "info");

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

  log(`VIN: ${vinString}`, "info");

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

  log(`Розрахункове навантаження двигуна: ${engineLoadValue} %`, "info");

  return engineLoadValue;
}

function parseEngineOilTemperature(value) {
  if (!value.startsWith("41 5C")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = unsignedIntFromBytes(temperatureByte) - 40;

  log(`Температура моторної оливи: ${temperatureValue} °C`, "info");

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

  log(`Оберти двигуна: ${rpmValue} об/хв`, "info");

  return rpmValue;
}

function parseVehicleSpeed(value) {
  if (!value.startsWith("41 0D")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const speedByte = separateBytes[2];
  const speedValue = unsignedIntFromBytes(speedByte);

  log(`Швидкість: ${speedValue} км/год`, "info");

  return speedValue;
}

function parseIntakeAirTemperature(value) {
  if (!value.startsWith("41 0F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = unsignedIntFromBytes(temperatureByte) - 40;

  log(`Температура повітря на вході: ${temperatureValue} °C`, "info");

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

  log(`Масова витрата повітря: ${massAirFlowValue.toFixed(2)} г/c`, "info");

  return massAirFlowValue;
}

function parseFuelTankLevel(value) {
  if (!value.startsWith("41 2F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const fuelTankLevelByte = separateBytes[2];
  const fuelTankLevelValue = (100 / 255) * unsignedIntFromBytes(fuelTankLevelByte);

  log(`Рівень палива в баку: ${fuelTankLevelValue.toFixed(2)} %`, "info");

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

  log(`Напруга на електронному блоці управління: ${voltageValue.toFixed(2)} В`, "info");

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

  log(`Витрата пального: ${rateValue.toFixed(2)} л/год`, "info");

  return rateValue;
}

function parseBmsInfoBuffer(buffer) {
  const joinedBuffer = buffer.join("").replaceAll("\n", "");

  const numberedPackets = Array.from(joinedBuffer.matchAll(/\d\:(\s[0-9A-F][0-9A-F]){7}/gm).map((match) => match[0]));

  const packets = numberedPackets.map((packet) => packet.split(":")[1].trim().split(" "));

  return packets;
}

let bmsInfoBuffer01 = [];
function parseKiaNiroBmsInfo01(value) {
  if (value.includes(">")) {
    const separatePacketBytes = parseBmsInfoBuffer(bmsInfoBuffer01);

    console.table(separatePacketBytes);

    if (separatePacketBytes.length !== 8) {
      bmsInfoBuffer01 = [];
      log(
        `Помилка при отриманні інформації з BMS #1 Kia Niro - неправильна кількість пакетів: ${separatePacketBytes.length}.`
      );
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

    log(`Інформація з BMS #1 Kia Niro:`, "info");
    log(`- рівень заряду: ${socValue} %`, "info");
    log(`- доступна потужність рекуперації: ${maxRegenValue} кВт`, "info");
    log(`- доступна потужність: ${maxPowerValue} кВт`, "info");
    log(`- температура акумулятора (макс.): ${batteryMaxT} °C`, "info");
    log(`- температура акумулятора (мін.): ${batteryMinT} °C`, "info");
    log(`- мінімальна напруга комірки: ${maxCellVoltageValue} В`, "info");
    log(`- максимальна напруга комірки: ${minCellVoltageValue} В`, "info");
    log(
      `- потужність ${batteryPower > 0 ? "розряджання" : "заряджання"} акумулятора: ${
        Math.abs(batteryPower) / 1000
      } кВт`,
      "info"
    );
    log(
      `- струм батареї: ${batteryCurrentValue} А / ${batteryCurrentValue > 0 ? "розряджання" : "заряджання"}`,
      "info"
    );
    log(`- напруга батареї: ${batteryVoltageValue} В`, "info");
    log(`- напруга 12В батареї: ${battery12VVoltage} В`, "info");

    bmsInfoBuffer01 = [];
  }

  bmsInfoBuffer01.push(value);
}

let bmsInfoBuffer05 = [];
function parseKiaNiroBmsInfo05(value) {
  console.log(bmsInfoBuffer05);
  if (value.includes(">")) {
    console.log(bmsInfoBuffer05);

    const separatePacketBytes = parseBmsInfoBuffer(bmsInfoBuffer05);

    console.table(separatePacketBytes);

    console.table(separatePacketBytes);

    const heaterTemp = parseSignedByte(separatePacketBytes[2][6]);

    const sohByteA = separatePacketBytes[3][1];
    const sohByteB = separatePacketBytes[3][2];

    const sohValue = unsignedIntFromBytes([sohByteA, sohByteB]) / 10;

    log(`Інформація з BMS #5 Kia Niro:`, "info");
    log(`- здоров'я акумулятора (SOH): ${sohValue} %`, "info");
    log(`- температура обігрівача акумулятора: ${heaterTemp} °C`, "info");

    bmsInfoBuffer05 = [];
  }

  bmsInfoBuffer05.push(value);
}
