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
  newLogLine.textContent = string;
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
    processActiveDevice();
  } catch (error) {
    log(`Помилка: ${error}`, "error");
  }
}

document.querySelector("#requestDevice").addEventListener("click", onRequestBluetoothDeviceButtonClick);

let writeCharacteristic = null;
let readyForTheNextCommand = true;

const sleep = async (timeout) => new Promise((resolve) => setTimeout(() => resolve(true), timeout));

async function processActiveDevice() {
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
    const value = new TextDecoder().decode(rawValue).trim();
    log(`Отримано: ${value}`);
    parseResponse(value);
  });

  sendData("ATZ");
  await sleep(500);

  log("Підписку створено - готовий до роботи.");
}

let currentCommand = "";

const sendData = (data) => {
  if (!writeCharacteristic) {
    log(`Спроба надіслати команду: ${data} - відсутнє підключення.`, "error");
    return;
  }

  if (data) {
    log(`Надсилання: ${data}`);
    writeCharacteristic.writeValue(new TextEncoder().encode(data + "\r"));
    currentCommand = data.trim();
  }
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
};

const COMMAND_LABELS = {
  [COMMANDS.VIN]: "VIN",
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
};

function parseResponse(value) {
  console.log(currentCommand, COMMANDS);
  const handler = handlers[currentCommand];
  if (handler) {
    handler(value);
  }
}

const engineCoolantTemperatureResponses = ["0105", "41 05 4E \r", "\r>"];

function parseEngineCoolantTemperature(value) {
  if (!value.startsWith("41 05")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = parseInt(temperatureByte, 16) - 40;

  log(`Температура охолоджувальної рідини двигуна: ${temperatureValue} °C`, "info");
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
}

function parseCalculatedEngineLoadResponse(value) {
  if (!value.startsWith("41 04")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const engineLoadByte = separateBytes[2];
  const engineLoadValue = parseInt(engineLoadByte) / 2.55;

  log(`Розрахункове навантаження двигуна: ${engineLoadValue} %`, "info");
}

function parseEngineOilTemperature(value) {
  if (!value.startsWith("41 5C")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = parseInt(temperatureByte, 16) - 40;

  log(`Температура моторної оливи: ${temperatureValue} °C`, "info");
}

function parseEngineSpeed(value) {
  if (!value.startsWith("41 0C")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const rpmByteA = separateBytes[2];
  const rpmByteB = separateBytes[3];
  const rpmValue = (256 * parseInt(rpmByteA, 16) + parseInt(rpmByteB, 16)) / 4;

  log(`Оберти двигуна: ${rpmValue} об/хв`, "info");
}

function parseVehicleSpeed(value) {
  if (!value.startsWith("41 0D")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const speedByte = separateBytes[2];
  const speedValue = parseInt(speedByte, 16);

  log(`Швидкість: ${speedValue} км/год`, "info");
}

function parseIntakeAirTemperature(value) {
  if (!value.startsWith("41 0F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const temperatureByte = separateBytes[2];
  const temperatureValue = parseInt(temperatureByte, 16) - 40;

  log(`Температура повітря на вході: ${temperatureValue} °C`, "info");
}

function parseMassAirFlowSensorValue(value) {
  if (!value.startsWith("41 10")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const massAirFlowA = separateBytes[2];
  const massAirFlowB = separateBytes[3];
  const massAirFlowValue = (256 * parseInt(massAirFlowA, 16) + parseInt(massAirFlowB, 16)) / 100;

  log(`Масова витрата повітря: ${massAirFlowValue} г/c`, "info");
}

function parseFuelTankLevel(value) {
  if (!value.startsWith("41 2F")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const fuelTankLevelByte = separateBytes[2];
  const fuelTankLevelValue = (100 / 255) * parseInt(fuelTankLevelByte, 16);

  log(`Рівень палива в баку: ${fuelTankLevelValue.toFixed(2)} %`, "info");
}

function parseControlModuleVoltage(value) {
  if (!value.startsWith("41 42")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const voltageByteA = separateBytes[2];
  const voltageByteB = separateBytes[3];
  const voltageValue = (256 * parseInt(voltageByteA, 16) + parseInt(voltageByteB, 16)) / 1000;

  log(`Напруга на електронному блоці управління: ${voltageValue} В`, "info");
}

function parseEngineFuelRate(value) {
  if (!value.startsWith("41 5E")) {
    return;
  }

  const separateBytes = value.trim().split(" ");
  const rateByteA = separateBytes[2];
  const rateByteB = separateBytes[3];
  const rateValue = (256 * parseInt(rateByteA, 16) + parseInt(rateByteB, 16)) / 20;

  log(`Витрата пального: ${rateValue} л/год`, "info");
}
