const DOS = new ListWidget();
const now = new Date();

const width = 335;
const height = 6;
const fm = FileManager.iCloud();
const image = fm.readImage(`${fm.documentsDirectory()}/DOS_medBG.PNG`);
DOS.backgroundImage = image;

const weekday = now.getDay() == 0 ? 6 : now.getDay() - 1;
const minutes = now.getMinutes();
const hours = now.getHours();
const month = now.getDate() + 1;
const year = now.getMonth() + 1;

const dayPassed = (((hours + 1) * 60) + minutes);

addProgElement(1440, dayPassed, 'day');
addProgElement(10080, ((1440 * (weekday + 1)) + dayPassed), 'week');
addProgElement(10000, (batteryLevel * 100), 'battery');

Script.setWidget(DOS);
Script.complete();

function getBattLevel() {
  const batteryLevelRaw = Device.batteryLevel();
  const batteryLevel = batteryLevelRaw * 100;
}

function addProgElement(total, past, str) {
  const progText = DOS.addText(str);
  const progImage = DOS.addImage(createProgImage(total, past));
  progText.textColor = new Color('#EDEDED');
  progText.font = Font.boldSystemFont(13);
  progText.leftAlignText();
  DOS.addSpacer(6);
  progImage.imageSize = new Size(width, height);
  DOS.addSpacer(6);
}

function createProgImage(total, past) {
  const progContext = new DrawContext();
  progContext.size = new Size(width, height);
  progContext.opaque = false;
  progContext.respectScreenScale = true;
  progContext.setFillColor(new Color('#121212'));
  const progPathBG = new Path();
  progPathBG.addRoundedRect(new Rect(0, 0, width, height), 3, 2);
  progContext.addPath(progPathBG);
  progContext.fillPath();
  progContext.setFillColor(new Color('#EDEDED'));
  const progPath = new Path();
  progPath.addRoundedRect(new Rect(0, 0, (width * past) / total, height), 3, 2);
  progContext.addPath(progPath);
  progContext.fillPath();
  return progContext.getImage();
}
